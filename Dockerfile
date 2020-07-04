FROM node:14-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

ENV SERVER_HOSTNAME=0.0.0.0

COPY server.ts tsconfig.json tsconfig-webpack.json .eslintrc.js tslint.json webpack.config.ts webpack.prod.config.ts ./
COPY src src
COPY typings typings

EXPOSE 3001/tcp

ENTRYPOINT ["yarn", "run"]
