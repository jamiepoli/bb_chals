FROM node:alpine

RUN apk update

ENV port=8990
WORKDIR /app
COPY . ./

RUN npm i

ENV FLAG="vie{hi}"

RUN addgroup -S ctf && adduser -S ctf -G ctf
USER ctf:ctf

CMD [ "node", "index.js" ]