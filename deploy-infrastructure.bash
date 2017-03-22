#!/bin/bash -ex

cd infrastructure
terraform init
terraform plan -var-file starter-pack.tfvars
terraform apply -var-file starter-pack.tfvars
cd ..
