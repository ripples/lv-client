FROM molecularplayground/node-js

COPY . /src

WORKDIR /src

RUN npm install

RUN npm run build-dev

CMD ["npm", "start"]

EXPOSE 3000
