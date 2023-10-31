FROM node:17-alpine 

WORKDIR /src/client

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]