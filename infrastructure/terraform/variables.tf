variable "aws_region" {
  description = "AWS region for the CodeBuild deployment project and S3 bucket."
  type        = string
  default     = "ap-southeast-4"
}

variable "environment" {
  description = "Deployment environment label."
  type        = string
  default     = "prod"
}

variable "domain" {
  description = "Cloudflare zone name."
  type        = string
  default     = "603.nz"
}

variable "host" {
  description = "Hostname served by the CloudFront distribution."
  type        = string
  default     = "starter-pack.603.nz"
}

variable "cloudflare_api_token_parameter_name" {
  description = "SSM Parameter Store name containing the Cloudflare API token."
  type        = string
  default     = "/starter-pack/cloudflare-api-token"
}

variable "ga_id_parameter_name" {
  description = "SSM Parameter Store name containing the Google Analytics ID injected at build time."
  type        = string
  default     = "/starter-pack/ga-id"
}

variable "auth0_client_id" {
  description = "Auth0 client ID injected into the build as a plaintext environment variable. Public value, not a secret."
  type        = string
  default     = "4o9Sngqkj55rQuEpI3TUs64c5EMJ2hO9"
}

variable "auth0_domain" {
  description = "Auth0 tenant domain injected into the build as a plaintext environment variable. Public value, not a secret."
  type        = string
  default     = "603.au.auth0.com"
}

variable "codebuild_project_name" {
  description = "Name of the CodeBuild project that builds and deploys the SPA."
  type        = string
  default     = "starter-pack"
}

variable "codebuild_source_location" {
  description = "GitHub repository URL used by the CodeBuild source."
  type        = string
  default     = "https://github.com/jch254/starter-pack.git"
}

variable "codebuild_buildspec" {
  description = "Path to the CodeBuild buildspec file."
  type        = string
  default     = "buildspec.yml"
}

variable "codebuild_build_compute_type" {
  description = "CodeBuild compute type."
  type        = string
  default     = "BUILD_GENERAL1_SMALL"
}

variable "codebuild_build_docker_image" {
  description = "Docker image to use as the CodeBuild build environment."
  type        = string
  default     = "jch254/docker-node-terraform-aws"
}

variable "codebuild_build_docker_tag" {
  description = "Docker image tag to use as the CodeBuild build environment."
  type        = string
  default     = "22.x-docker"
}

variable "codebuild_cache_bucket" {
  description = "Optional S3 bucket/prefix for CodeBuild dependency cache."
  type        = string
  default     = "jch254-codebuild-cache/starter-pack"
}

variable "remote_state_bucket" {
  description = "S3 bucket used for Terraform remote state."
  type        = string
  default     = "jch254-terraform-remote-state"
}

variable "remote_state_key" {
  description = "S3 key used for this repo's Terraform remote state."
  type        = string
  default     = "starter-pack-prod-infrastructure"
}

variable "codebuild_webhook_enabled" {
  description = "Whether CodeBuild should deploy automatically on pushes to the source branch."
  type        = bool
  default     = true
}

variable "codebuild_webhook_branch" {
  description = "Git branch that triggers CodeBuild webhook builds."
  type        = string
  default     = "typescript"
}

variable "build_notifier_lambda_function_arn" {
  description = "Optional shared build-notifier Lambda ARN for CodeBuild success/failure notifications."
  type        = string
  default     = ""
}
