FROM node:16.17.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444

CMD ["node", "src/index.js"]