terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }

    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket  = "jch254-terraform-remote-state"
    key     = "starter-pack-prod-infrastructure"
    region  = "ap-southeast-4"
    encrypt = true
  }
}
