output "zone_id" {
  description = "Cloudflare zone ID for the configured domain."
  value       = data.cloudflare_zone.zone.id
}

output "dns_record_ids" {
  description = "Cloudflare DNS record IDs keyed by record key (validation + app records merged)."
  value       = merge(module.dns_validation_records.record_ids, module.dns_app_records.record_ids)
}

output "host" {
  description = "Public hostname served by the CloudFront distribution."
  value       = var.host
}

output "deployment_bucket" {
  description = "Deployment S3 bucket name."
  value       = module.web_app.s3_bucket_id
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (used for invalidations)."
  value       = module.web_app.cloudfront_distribution_id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name (CNAME target)."
  value       = module.web_app.cloudfront_domain_name
}

output "acm_certificate_arn" {
  description = "Validated ACM certificate ARN used by CloudFront."
  value       = aws_acm_certificate_validation.host.certificate_arn
}

output "cloudflare_api_token_parameter_name" {
  description = "SSM parameter name for the Cloudflare API token."
  value       = module.cloudflare_api_token_parameter.name
}

output "ga_id_parameter_name" {
  description = "SSM parameter name for the Google Analytics ID."
  value       = module.ga_id_parameter.name
}

output "codebuild_project_name" {
  description = "Name of the CodeBuild project that builds and deploys the SPA."
  value       = module.codebuild_deploy_project.project_name
}

output "codebuild_project_arn" {
  description = "ARN of the CodeBuild project that builds and deploys the SPA."
  value       = module.codebuild_deploy_project.project_arn
}

output "codebuild_role_arn" {
  description = "ARN of the IAM role used by the CodeBuild deployment project."
  value       = module.codebuild_role.role_arn
}

output "codebuild_build_notification_event_rule_arn" {
  description = "ARN of the optional CodeBuild notification EventBridge rule."
  value       = module.codebuild_deploy_project.build_notification_event_rule_arn
}
