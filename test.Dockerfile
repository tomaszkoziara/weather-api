FROM node:8-alpine
RUN apk add --no-cache git
RUN git clone https://github.com/tomaszkoziara/weather-api.git /usr/app
WORKDIR /usr/app/weather-api
RUN npm install
EXPOSE 3000
RUN npm run build
RUN npm run test