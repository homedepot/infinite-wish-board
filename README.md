# hackathon-starter
create-react-app + expressjs + mongodb + docker-compose!!

[![Build Status](https://travis-ci.org/homedepot/hackathon-starter.svg?branch=master)](https://travis-ci.org/homedepot/hackathon-starter)

## Quick Setup

This starter application uses docker-compose to get the entire environment setup off of the ground.

The tech stack is: 

- [create-react-app](https://github.com/facebook/create-react-app) on the front-end

- [express](https://expressjs.com/) API

- [Mongodb](https://www.mongodb.com/) for database 

If you don't have docker installed, install [docker desktop](https://www.docker.com/products/docker-desktop). 

From there, clone the repository into your workspace of choice. 

Finally, make sure you are on public wifi and then run the following command from your favorite terminal: 

```
docker-compose build && docker-compose up
```

*NOTE*: The first build will be slow due to docker world-building

This will host your front end on `localhost:3001`, your api endpoint on `localhost:3002`, and mongodb will be networked internally (more details TBD)

The frontend and backend will auto-refresh as you make changes, and the only time you will ever need to re-run `docker-compose build && docker-compose up` 
is if you made changes to the package.json file in either ui or api.
 

## TODOs

- Add captcha 
- Add Auth UI controls. 
- Make sure CI=true is set for node_env in travis
- Export code coverage on travis-ci
- Set up cypress
- Make sure to set process.env.cookieSigningKey && process.env.mongoUrl