FROM node:lts-alpine

WORKDIR /api

ENV PATH /api/node_modules/.bin:$PATH

COPY package*.json ./

RUN yarn global add nodemon

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "start"]
