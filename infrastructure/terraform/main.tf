provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.codebuild_project_name
    }
  }
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.codebuild_project_name
    }
  }
}

provider "cloudflare" {}

data "aws_caller_identity" "current" {}

data "cloudflare_zone" "zone" {
  filter = {
    name = var.domain
  }
}

locals {
  bucket_name = var.host

  codebuild_cache_bucket_parts = var.codebuild_cache_bucket == "" ? [] : split("/", var.codebuild_cache_bucket)
  codebuild_cache_bucket_name  = length(local.codebuild_cache_bucket_parts) > 0 ? local.codebuild_cache_bucket_parts[0] : ""
  codebuild_cache_bucket_prefix = length(local.codebuild_cache_bucket_parts) > 1 ? (
    join("/", slice(local.codebuild_cache_bucket_parts, 1, length(local.codebuild_cache_bucket_parts)))
  ) : ""
  codebuild_cache_object_arn = local.codebuild_cache_bucket_prefix != "" ? (
    "arn:aws:s3:::${local.codebuild_cache_bucket_name}/${local.codebuild_cache_bucket_prefix}/*"
    ) : (
    local.codebuild_cache_bucket_name != "" ? "arn:aws:s3:::${local.codebuild_cache_bucket_name}/*" : ""
  )

  remote_state_bucket_arn = "arn:aws:s3:::${var.remote_state_bucket}"
  remote_state_object_arn = "arn:aws:s3:::${var.remote_state_bucket}/${var.remote_state_key}"
  codebuild_project_arn   = "arn:aws:codebuild:${var.aws_region}:${data.aws_caller_identity.current.account_id}:project/${var.codebuild_project_name}"
  deployment_bucket_arn   = "arn:aws:s3:::${local.bucket_name}"

  acm_validation_records = {
    for key, record in module.acm_certificate.validation_records :
    "acm_${key}" => {
      name    = trimsuffix(record.name, ".")
      type    = record.type
      content = trimsuffix(record.value, ".")
      proxied = false
      ttl     = 1
    }
  }

  app_dns_records = {
    host = {
      content = module.web_app.cloudfront_domain_name
      name    = var.host
      proxied = false
      ttl     = 1
      type    = "CNAME"
    }
  }

  cloudfront_policy_statement = {
    Effect = "Allow"
    Action = [
      "cloudfront:GetDistribution",
      "cloudfront:GetDistributionConfig",
      "cloudfront:CreateDistribution",
      "cloudfront:UpdateDistribution",
      "cloudfront:DeleteDistribution",
      "cloudfront:TagResource",
      "cloudfront:UntagResource",
      "cloudfront:ListTagsForResource",
      "cloudfront:CreateInvalidation",
      "cloudfront:GetInvalidation",
      "cloudfront:GetOriginAccessControl",
      "cloudfront:CreateOriginAccessControl",
      "cloudfront:UpdateOriginAccessControl",
      "cloudfront:DeleteOriginAccessControl",
    ]
    Resource = "*"
  }

  deployment_bucket_policy_statements = [
    {
      Effect = "Allow"
      Action = [
        "s3:GetBucketLocation",
        "s3:ListBucket",
        "s3:GetBucketPolicy",
        "s3:PutBucketPolicy",
        "s3:GetBucketPublicAccessBlock",
        "s3:PutBucketPublicAccessBlock",
        "s3:GetBucketOwnershipControls",
        "s3:PutBucketOwnershipControls",
        "s3:GetBucketTagging",
        "s3:PutBucketTagging",
        "s3:CreateBucket",
        "s3:DeleteBucket",
        "s3:GetBucketCORS",
        "s3:PutBucketCORS",
      ]
      Resource = local.deployment_bucket_arn
    },
    {
      Effect = "Allow"
      Action = [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:GetObjectAcl",
        "s3:PutObjectAcl",
      ]
      Resource = "${local.deployment_bucket_arn}/*"
    },
  ]

  codebuild_cache_statements = local.codebuild_cache_bucket_name == "" ? [] : [
    {
      Effect = "Allow"
      Action = [
        "s3:GetBucketLocation",
        "s3:ListBucket",
      ]
      Resource = "arn:aws:s3:::${local.codebuild_cache_bucket_name}"
    },
    {
      Effect = "Allow"
      Action = [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
      ]
      Resource = local.codebuild_cache_object_arn
    },
  ]
}

module "cloudflare_api_token_parameter" {
  source = "github.com/jch254/terraform-modules//ssm-parameter-placeholder?ref=1.17.0"

  name        = var.cloudflare_api_token_parameter_name
  description = "Cloudflare API token for starter-pack Terraform"

  tags = {
    Environment = var.environment
  }
}

module "ga_id_parameter" {
  source = "github.com/jch254/terraform-modules//ssm-parameter-placeholder?ref=1.17.0"

  name        = var.ga_id_parameter_name
  description = "Google Analytics ID injected into starter-pack at build time"

  tags = {
    Environment = var.environment
  }
}

module "acm_certificate" {
  source = "github.com/jch254/terraform-modules//acm-dns-validated-certificate?ref=1.17.0"

  providers = {
    aws = aws.us_east_1
  }

  domain_name = var.host

  tags = {
    Name = var.host
  }
}

module "dns_validation_records" {
  source = "github.com/jch254/terraform-modules//cloudflare-dns-records?ref=1.17.0"

  zone_id = data.cloudflare_zone.zone.id
  records = local.acm_validation_records
}

resource "aws_acm_certificate_validation" "host" {
  provider = aws.us_east_1

  certificate_arn         = module.acm_certificate.arn
  validation_record_fqdns = [for r in local.acm_validation_records : r.name]

  depends_on = [module.dns_validation_records]
}

module "web_app" {
  source = "github.com/jch254/terraform-modules//web-app?ref=1.17.0"

  bucket_name = local.bucket_name
  dns_names   = [var.host]
  acm_arn     = aws_acm_certificate_validation.host.certificate_arn

  tags = {
    Project = var.codebuild_project_name
  }
}

module "dns_app_records" {
  source = "github.com/jch254/terraform-modules//cloudflare-dns-records?ref=1.17.0"

  zone_id = data.cloudflare_zone.zone.id
  records = local.app_dns_records
}

module "codebuild_role" {
  source = "github.com/jch254/terraform-modules//codebuild-terraform-role?ref=1.17.0"

  name        = var.codebuild_project_name
  environment = var.environment

  s3_bucket_arns = [local.remote_state_bucket_arn]
  s3_object_arns = [local.remote_state_object_arn]

  ssm_parameter_arns = [
    module.cloudflare_api_token_parameter.arn,
    module.ga_id_parameter.arn,
  ]

  iam_role_arns           = []
  prefix_managed_services = ["iam_role", "event_rule"]

  codebuild_project_arns = [local.codebuild_project_arn]

  enable_acm = true

  additional_policy_statements = concat(
    [local.cloudfront_policy_statement],
    local.deployment_bucket_policy_statements,
    local.codebuild_cache_statements,
  )
}

module "codebuild_deploy_project" {
  source = "github.com/jch254/terraform-modules//codebuild-project?ref=1.17.0"

  name                               = var.codebuild_project_name
  description                        = "Build and deploy starter-pack to S3 + CloudFront"
  codebuild_role_arn                 = module.codebuild_role.role_arn
  build_compute_type                 = var.codebuild_build_compute_type
  build_docker_image                 = var.codebuild_build_docker_image
  build_docker_tag                   = var.codebuild_build_docker_tag
  privileged_mode                    = false
  image_pull_credentials_type        = "CODEBUILD"
  source_type                        = "GITHUB"
  source_location                    = var.codebuild_source_location
  buildspec                          = var.codebuild_buildspec
  git_clone_depth                    = 1
  cache_bucket                       = var.codebuild_cache_bucket
  badge_enabled                      = false
  create_log_group                   = true
  webhook_enabled                    = var.codebuild_webhook_enabled
  environment                        = var.environment
  build_notifier_lambda_function_arn = var.build_notifier_lambda_function_arn
  build_notifier_app_url             = "https://${var.host}"
  build_notifier_github_repo_url     = trimsuffix(var.codebuild_source_location, ".git")

  webhook_filter_groups = [[
    {
      type    = "EVENT"
      pattern = "PUSH"
    },
    {
      type    = "HEAD_REF"
      pattern = "refs/heads/${var.codebuild_webhook_branch}"
    },
  ]]

  environment_variables = [
    { name = "AWS_DEFAULT_REGION", value = var.aws_region },
    { name = "REMOTE_STATE_BUCKET", value = var.remote_state_bucket },
    { name = "TF_STATE_KEY", value = var.remote_state_key },
    { name = "DEPLOYMENT_BUCKET", value = local.bucket_name },
    { name = "APP_HOSTNAME", value = var.host },
    { name = "AUTH0_CLIENT_ID", value = var.auth0_client_id },
    { name = "AUTH0_DOMAIN", value = var.auth0_domain },
  ]
}
