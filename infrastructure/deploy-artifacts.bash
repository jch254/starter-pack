#!/bin/bash -ex

echo Publishing build artifacts to S3...

DEPLOYMENT_BUCKET="${DEPLOYMENT_BUCKET:-$(cd infrastructure/terraform && terraform output -raw deployment_bucket)}"
CLOUDFRONT_DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID:-$(cd infrastructure/terraform && terraform output -raw cloudfront_distribution_id)}"

aws s3 sync dist/ "s3://${DEPLOYMENT_BUCKET}/" \
  --delete \
  --exclude '.git/*'

echo Invalidating CloudFront distribution "${CLOUDFRONT_DISTRIBUTION_ID}"...
aws cloudfront create-invalidation \
  --distribution-id "${CLOUDFRONT_DISTRIBUTION_ID}" \
  --paths '/*' \
  --output text > /dev/null
