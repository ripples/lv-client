FROM node:6.2.2

COPY . /src

WORKDIR /src

RUN npm install

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000
