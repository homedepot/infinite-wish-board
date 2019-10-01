![Hacktoberfest](https://hacktoberfest.digitalocean.com/assets/logo-hf19-header-8245176fe235ab5d942c7580778a914110fa06a23c3d55bf40e2d061809d8785.svg)

# Infinite Wish Board
create-react-app + expressjs + mongodb + docker-compose!!

[![Node.JS Version](https://img.shields.io/badge/node.js-10.16.3-00ADD8.svg?style=flat)](https://nodejs.org/en/) 
[![Code Coverage](https://img.shields.io/codecov/c/github/homedepot/infinite-wish-board.svg?style=flat)](https://codecov.io/gh/homedepot/infinite-wish-board)
[![Build Status](https://travis-ci.org/homedepot/infinite-wish-board.svg?branch=master)](https://travis-ci.org/homedepot/infinite-wish-board)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat)](LICENSE)

## What is Infinite Wish Board?

It is a new digital experience for kids that visit the Make-A-Wish of Georgia office. We, at Home Depot, donated a complete office renovation to make the Georgia office more inviting to kids. As part of that makeover, we also agreed to add a new digital experience. This is that experience. 


## Quick Setup

Infinite Wish Board uses docker-compose to get the entire environment setup off of the ground.

The tech stack is: 

- [create-react-app](https://github.com/facebook/create-react-app) on the front-end

- [express](https://expressjs.com/) API

- [Mongodb](https://www.mongodb.com/) for database 

If you don't have docker installed, install [docker desktop](https://www.docker.com/products/docker-desktop).

*NOTE:* If it's your first time installing Docker & you're on Windows, make sure the "Use Windows containers instead of Linux containers" checkbox is unchecked during setup, or you will run into an error when trying to build.

From there, clone the repository into your workspace of choice.

Finally, run the following command from your favorite terminal:

```
docker-compose down && docker-compose build && docker-compose up
```

*NOTE*: The first build will be slow due to docker world-building

This will host your front end on `localhost:3001`, your api endpoint on `localhost:3002`, and mongodb will be networked internally (more details TBD)

The frontend and backend will auto-refresh as you make changes, and the only time you will ever need to re-run `docker-compose down && docker-compose build && docker-compose up` 
is if you made changes to the package.json file in either ui or api.
 

## TODOs

See [issues](https://github.com/homedepot/infinite-wish-board/issues)
