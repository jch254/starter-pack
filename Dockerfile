FROM node:22-alpine
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

ENV SERVER_HOSTNAME=0.0.0.0

COPY server.ts tsconfig.json tsconfig-webpack.json .eslintrc.js tslint.json webpack.config.ts webpack.prod.config.ts ./
COPY src src
COPY typings typings

EXPOSE 3001/tcp

ENTRYPOINT ["pnpm", "run"]
