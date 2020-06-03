FROM node:14.0-slim
RUN mkdir -p /opt/app/node-app
WORKDIR /opt/app/node-app
COPY ./node-app/. /opt/app/node-app
RUN yarn
