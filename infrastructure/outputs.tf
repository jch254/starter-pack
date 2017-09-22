output "s3_bucket_id" {
  value = "${module.webapp.s3_bucket_id}"
}

output "cloudfront_distribution_id" {
  value = "${module.webapp.cloudfront_distribution_id}"
}
