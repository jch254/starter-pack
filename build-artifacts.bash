#!/bin/bash -ex

yarn install
export NODE_ENV=production
yarn run build
