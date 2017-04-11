# [Starter Pack](https://starter-pack.603.nu)

[Bitbucket Pipelines status](https://bitbucket.org/jch254/starter-pack/addon/pipelines/home)

## Overview

Starter Pack combines React, Redux and Redux-saga with Auth0's Lock as a starting point for modern
web apps with solid authentication. Why reinvent the wheel? The app utilises Rebass and Reflexbox to
keep things looking decent. I built this as a way to quickly prototype new ideas.

The app contains a 'locked down' Books page which requires a user to log in/sign up before content
will be visible. The data is read from a local JSON file as this is a only demonstration/starting
point. In the real world data would be fetched from an API - see [apiService.js](./src/apiService.js).
Protected routes in the API should check validity of the JWT token and return unauthorised
if invalid. The app should then prompt the user to log in again. See [Serverless API](https://github.com/jch254/serverless-node-dynamodb-api)
for a more detailed example of authentication in action.

![Main](https://img.jch254.com/Main.png)

![Modal](https://img.jch254.com/Login.png)

![Recommended](https://img.jch254.com/Books.png)

## Tools Used

* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux) (ft. various middleware)
* [Redux Saga](https://github.com/yelouafi/redux-saga)
* [Auth0 Lock](https://github.com/auth0/lock)
* [Immutable.js](https://github.com/facebook/immutable-js/)
* [React Router](https://github.com/ReactTraining/react-router)
* [Reselect](https://github.com/jxnblk/rebass)
* [Rebass](https://github.com/jxnblk/rebass)
* [Reflexbox](https://github.com/jxnblk/reflexbox)
* [Webpack](https://github.com/webpack/webpack)
* [Node.js](https://github.com/nodejs/node)

**AUTH0_CLIENT_ID and AUTH0_DOMAIN environment variable must be set before `yarn run` commands below.**

E.g. `AUTH0_CLIENT_ID=YOUR_CLIENT_ID AUTH0_DOMAIN=YOUR_DOMAIN yarn run dev`

## Running locally

1. Sign up and create a new [Auth0 app](https://auth0.com)
1. Add http://localhost:3001 as an Allowed Origin (CORS) for your newly created app (don't forget to press save)
1. Run the following commands in the app's root directory then open http://localhost:3001

```
yarn install
yarn run dev
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

Refer to the [/infrastructure](../master/infrastructure) directory.
