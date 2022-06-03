#!/usr/bin/env bash

rm -rf dist

pnpm build:epact --systemless

mkdir dist/api
mv dist/main.js dist/api/index.js