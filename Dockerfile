FROM node:8-alpine
WORKDIR /usr/app/weather-api
COPY package*.json ./
COPY tsconfig.json .
COPY src ./src
COPY config ./config
RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install --no-cache && \
    npm run build
EXPOSE 3000
CMD npm run start