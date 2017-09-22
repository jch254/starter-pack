FROM node:8-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

ENV SERVER_HOSTNAME=0.0.0.0

COPY server.ts tsconfig.json tslint.json webpack.config.ts webpack.prod.config.ts ./
COPY src src

EXPOSE 3001/tcp

ENTRYPOINT ["yarn", "run", "dev"]