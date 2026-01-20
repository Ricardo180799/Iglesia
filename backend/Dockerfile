FROM node:22.16.0-slim
WORKDIR /app/backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["nodemon", "Server/Server.js"]