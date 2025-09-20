FROM node:alpine
RUN apk update
WORKDIR /usr/salem
ENV port=8990
COPY package*.json ./
RUN npm install
COPY . .
RUN addgroup -S ctf && adduser -S ctf -G ctf
USER ctf:ctf
CMD [ "node", "app.js" ]