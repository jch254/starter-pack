export TF_VAR_route53_zone_id=$ROUTE53_ZONE_ID
export TF_VAR_acm_arn=$ACM_ARN
cd infrastructure
terraform remote config -backend=s3 \
  -backend-config="bucket=603-terraform-remote-state" \
  -backend-config="key=starter-pack.tfstate" \
  -backend-config="region=ap-southeast-2" \
  -backend-config="encrypt=true"
terraform plan -var-file starter-pack.tfvars
terraform apply -var-file starter-pack.tfvars
cd ..
