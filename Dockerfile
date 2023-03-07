FROM node:14-alpine
WORKDIR /app
COPY package*.json ./ 
RUN npm i 
COPY . .
ENV NODE_ENV=production
EXPOSE 3001
CMD [ "npm", "start" ]