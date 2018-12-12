# [Starter Pack](https://starter-pack-typescript.603.nz)

## Overview

Starter Pack combines React, Redux and Redux-saga with Auth0's Lock as a starting point for modern
web apps with solid authentication. Why reinvent the wheel? The app utilises Rebass to
keep things looking decent. I built this as a way to quickly prototype new ideas.

Webpack (ft. various loaders/plugins/tools) is used to run a local development server and build
the production version. [Code splitting](https://webpack.js.org/guides/code-splitting)
(with [long-term caching](https://webpack.js.org/guides/caching) in the production version) has
been set up via Webpack and React. Webpack's SplitChunksPlugin is used to split vendor
code. [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy) is used for
async component-centric code splitting and loading - see [App.tsx](./src/app/App.tsx) as an
example of creating a split point (restart the dev server if the new chunk is not emitted).
MiniCssExtractPlugin is used to split CSS. HtmlWebpackPlugin is used to generate an index.html
with the appropriate output assets injected, the Webpack manifest is inlined into index.html to save requests.

The app contains a 'locked down' Books page which requires a user to log in/sign up before content
will be visible. The data is read from a local JSON file as this is a only demonstration/starting
point. In the real world data would be fetched from an API - see [apiService.ts](./src/apiService.ts).
Protected routes in the API should check validity of the JWT token and return unauthorised
if invalid. The app should then prompt the user to log in again. See
[Serverless API](https://github.com/jch254/serverless-node-dynamodb-api) for a more detailed example
of authentication in action.

This branch utilises [TypeScript for type checking](https://www.youtube.com/watch?v=V1po0BT7kac) and
transpliation to browser-friendly ES5 JavaScript while the [master branch](https://github.com/jch254/starter-pack/tree/master)
is a JavaScript implementation.

![Main](https://img.jch254.com/Main.png)

![Modal](https://img.jch254.com/Login.png)

![Recommended](https://img.jch254.com/Books.png)

## Tools Used

* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux) (ft. various middleware)
* [Redux Saga](https://github.com/yelouafi/redux-saga)
* [Auth0 Lock](https://github.com/auth0/lock)
* [React Router](https://github.com/ReactTraining/react-router)
* [Reselect](https://github.com/jxnblk/rebass)
* [Rebass](https://github.com/jxnblk/rebass)
* [Webpack](https://github.com/webpack/webpack)
* [TypeScript](https://github.com/Microsoft/TypeScript)
* [Node.js](https://github.com/nodejs/node)

**AUTH0_CLIENT_ID and AUTH0_DOMAIN environment variable must be set before `yarn run` commands below.**

E.g. `AUTH0_CLIENT_ID=YOUR_CLIENT_ID AUTH0_DOMAIN=YOUR_DOMAIN yarn run dev`

## Running locally (with hot reloading)

1. Sign up and create a new [Auth0 app](https://auth0.com)
1. Add http://localhost:3001 as an Allowed Origin (CORS) for your newly created app (don't forget to press save)
1. Run the following commands in the app's root directory then open http://localhost:3001

```
yarn install
yarn run dev
```

### Running development version locally in Docker container
1. Run the following commands in the app's root directory then submit requests to http://localhost:3001.

```
docker build -t starter-pack:typescript .
docker run -p 3001:3001 -e AUTH0_CLIENT_ID=YOUR_CLIENT_ID -e AUTH0_DOMAIN=YOUR_DOMAIN starter-pack:typescript
```

## Building the production version
1. Run the following commands in the app's root directory then check the /dist folder

```
yarn install
yarn run build
```

### Running production version locally

1. Run the following commands in the app's root directory then open http://localhost:3001

```
yarn install
yarn run prod
```

## Deployment/Infrastructure

Refer to the [/infrastructure](./infrastructure) directory.

