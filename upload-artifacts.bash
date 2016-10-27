cd infrastructure
S3_BUCKET_ID=`terraform output s3_bucket_id`
CLOUDFRONT_DISTRIBUTION_ID=`terraform output cloudfront_distribution_id`
cd ..

cd dist
aws s3 sync . "s3://${S3_BUCKET_ID}/" --delete --acl=public-read --exclude '.git/*'
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id "${CLOUDFRONT_DISTRIBUTION_ID}" --paths '/*'
cd ..
