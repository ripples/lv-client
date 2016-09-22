FROM node:6.2.2

COPY . /src

WORKDIR /src

RUN npm install

RUN npm run build-prod

CMD ["npm", "start"]
