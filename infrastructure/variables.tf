variable "region" {
  description = "AWS region to deploy to (e.g. ap-southeast-2)"
}

variable "dns_name" {
  description = "DNS name for Starter Pack"
}

variable "route53_zone_id" {
  description = "Route 53 Hosted Zone ID"
}

variable "acm_arn" {
  description = "ARN of ACM SSL certificate"
}
