#!/bin/bash -ex

echo Deploying infrastructure via Terraform...

cd infrastructure
terraform init \
  -backend-config "bucket=${REMOTE_STATE_BUCKET}" \
  -backend-config "key=${TF_VAR_name}" \
  -backend-config "region=${TF_VAR_region}" \
  -get=true \
  -upgrade=true
terraform plan -out main.tfplan
terraform apply main.tfplan
cd ..

echo Finished deploying infrastructure
