FROM node:15 as builder

WORKDIR /usr/src/app

COPY . .

RUN npm i

# prod
FROM node:15-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 3000

# CMD ["node", "index.js"]