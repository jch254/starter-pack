yarn install
export NODE_ENV=production
export AUTH0_CLIENT_ID=$AUTH0_CLIENT_ID
export AUTH0_DOMAIN=$AUTH0_DOMAIN
export GA_ID=$GA_ID
yarn run build
