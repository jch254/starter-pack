#!/bin/bash -ex

cd infrastructure
terraform remote config -backend=s3 \
  -backend-config="bucket=603-terraform-remote-state" \
  -backend-config="key=starter-pack.tfstate" \
  -backend-config="region=ap-southeast-2" \
  -backend-config="encrypt=true"

terraform plan -var-file starter-pack.tfvars
terraform apply -var-file starter-pack.tfvars
cd ..
