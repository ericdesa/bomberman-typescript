FROM node:8.9.3-alpine

WORKDIR app

COPY . .
RUN yarn install
RUN yarn build

EXPOSE 3000
CMD [ "node", "dist/index.js" ]
