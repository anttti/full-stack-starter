FROM node:16

WORKDIR /app
EXPOSE 4000

RUN apt-get update && \
    apt-get -y dist-upgrade && \
    apt install -y netcat && \
    chown -R node /app

USER node

COPY --chown=node src src
COPY --chown=node package.json .
COPY --chown=node tsconfig.json .
COPY --chown=node package-lock.json .

RUN npm i
RUN npm run build
