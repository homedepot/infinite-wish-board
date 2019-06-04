#!/bin/sh

if [ $NODE_ENV = "production" ]; then
  node app.js;
else
  nodemon app.js;
fi
