# Deployment/Infrastructure

Starter Pack is deployed to AWS on S3. CloudFront is used as a CDN. Route 53 is used for DNS.

--

### Deployment Prerequisites

**All commands below must be run in the /infrastructure directory.**

To deploy to AWS, you must:

1. Install [Terraform](https://www.terraform.io/) and make sure it is in your PATH.
1. Set your AWS credentials using one of the following options:
   1. Set your credentials as the environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
   1. Run `aws configure` and fill in the details it asks for.
   1. Run on an EC2 instance with an IAM Role.

#### Deploying infrastructure

1. Configure Terraform to use Remote State using the following command:
```terraform remote config -backend=s3 -backend-config="bucket=YOUR_BUCKET_NAME" -backend-config="key=starter-pack.tfstate" -backend-config="region=YOUR_REGION" -backend-config="encrypt=true"```
1. `terraform plan -var-file starter-pack.tfvars`
1. `terraform apply -var-file starter-pack-2.tfvars`

#### Updating infrastructure

1. Make necessary infrastructure code changes.
1. Configure Terraform to use Remote State using the following command:
```terraform remote config -backend=s3 -backend-config="bucket=YOUR_BUCKET_NAME" -backend-config="key=starter-pack.tfstate" -backend-config="region=YOUR_REGION" -backend-config="encrypt=true"```
1. `terraform plan -var-file starter-pack.tfvars`
1. `terraform apply -var-file starter-pack-2.tfvars`

#### Destroying infrastructure (use with care)

1. Configure Terraform to use Remote State using the following command:
```terraform remote config -backend=s3 -backend-config="bucket=YOUR_BUCKET_NAME" -backend-config="key=starter-pack.tfstate" -backend-config="region=YOUR_REGION" -backend-config="encrypt=true"```
1. `terraform plan -var-file starter-pack.tfvars`
