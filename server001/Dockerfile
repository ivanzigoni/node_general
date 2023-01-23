FROM node:18

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN mkdir /app/files

CMD ["npm", "run", "banana"]