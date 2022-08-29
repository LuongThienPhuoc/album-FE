FROM node:16.14.0

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

COPY package.json ./

COPY package-lock.json ./

RUN yarn

COPY . ./app

CMD ["yarn","start"]