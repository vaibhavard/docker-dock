FROM node:18-alpine

ENV API_HOST=0.0.0.0
WORKDIR /app
COPY . .

RUN npm install
EXPOSE 3000

CMD ["npm", "run", "start"]
