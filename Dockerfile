FROM node:22

WORKDIR /usr/src/app

COPY package*.json tsconfig*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

# CMD ["node", "dist/main"]
CMD ["npm", "run", "start:dev"]