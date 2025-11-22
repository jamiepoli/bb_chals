FROM node:alpine

RUN apk update

ENV port=8990
WORKDIR /app
COPY . ./

RUN npm i

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs 

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

ENV FLAG="vie{hi}"

RUN addgroup -S ctf && adduser -S ctf -G ctf
USER ctf:ctf

CMD [ "node", "index.js" ]