FROM node:8-alpine
WORKDIR /usr/app/weather-api-test
COPY package*.json ./
COPY tsconfig.json .
COPY src ./src
COPY test ./test
COPY config ./config
RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install --no-cache
RUN npm run test