FROM node:16.16.0

WORKDIR /home/twitter_clone_backend

COPY package*.json .
RUN npm install

COPY . .
ENV NODE_ENV=production

RUN npm run build
EXPOSE 5000
CMD ["npm","start"]
