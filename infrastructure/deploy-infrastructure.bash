#!/bin/bash -ex

cd infrastructure
terraform init
terraform plan -var-file main.tfvars -out main.tfplan
terraform apply main.tfplan
cd ..
