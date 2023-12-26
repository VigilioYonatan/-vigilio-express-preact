# install pnpm global
FROM node:20-alpine3.16 AS base
RUN npm i -g pnpm

# install dependencies
FROM base AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# development mode
FROM base AS development
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
CMD ["pnpm", "start:dev"]

FROM nginx:1.25.3-alpine as nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

#stage
FROM base AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build:serve
RUN pnpm build:dev
RUN pnpm prune --prod

# production mode
FROM base AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/resources/views  ./resources/views
COPY --from=build /app/public  ./public
COPY --from=build /app/package*.json  /app/.env ./
CMD ["pnpm", "start:prod"]
