FROM node:16

WORKDIR /app

RUN apt-get update && \
    apt-get -y dist-upgrade && \
    apt install -y netcat && \
    chown -R node /app

USER node

COPY --chown=node src src
COPY --chown=node prisma prisma
COPY --chown=node package.json .
COPY --chown=node tsconfig.json .
COPY --chown=node package-lock.json .

RUN npm i
RUN npm run build
RUN npx prisma generate
