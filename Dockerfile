FROM node:22

WORKDIR /usr/src/app

COPY package*.json tsconfig*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

# Default to production start. Use DEV command at build/run time if needed
CMD ["npm", "run", "start"]