#!/bin/bash -ex

S3_BUCKET_ID=$(cd infrastructure && terraform output s3_bucket_id)
CLOUDFRONT_DISTRIBUTION_ID=$(cd infrastructure && terraform output cloudfront_distribution_id)

cd dist
aws s3 sync . "s3://${S3_BUCKET_ID}/" --delete --acl=public-read --exclude '.git/*'
aws cloudfront create-invalidation --distribution-id "${CLOUDFRONT_DISTRIBUTION_ID}" --paths '/*'
cd ..
