FROM node:8-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

ENV SERVER_HOSTNAME=0.0.0.0

COPY server.js .babelrc .eslintrc .eslintignore webpack.config.babel.js webpack.prod.config.babel.js ./
COPY src src

EXPOSE 3001/tcp

ENTRYPOINT ["yarn", "run", "dev"]