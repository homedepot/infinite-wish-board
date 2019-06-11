#!/bin/sh

if [ $NODE_ENV = "production" ]; then
  node src/app.js;
else
  nodemon src/app.js;
fi
