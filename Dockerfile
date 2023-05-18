FROM node:20-alpine3.16 AS build-env

WORKDIR /app

COPY . ./

RUN npm install

RUN npm run build

RUN npm install -g json-server json-server-auth

FROM nginx:1.23.4-alpine

COPY --from=build-env /app/dist/jjtecnology/ /usr/share/nginx/html

COPY db.json ./

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"] && json-server-auth db.jsonß
