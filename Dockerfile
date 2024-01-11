# install pnpm global
FROM node:20-alpine3.16 AS base
RUN npm i -g pnpm

# install dependencies
FROM base AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml /app
RUN pnpm install

# development mode
FROM base AS development
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules /app/node_modules
CMD ["pnpm", "serve"]

FROM nginx:1.25.3-alpine as nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

#stage
FROM base AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules /app/node_modules
RUN pnpm build:serve && \
    pnpm build:dev && \
    pnpm prune --prod

# production mode
FROM base AS production
WORKDIR /app
COPY --from=build /app/dist  /app/dist
COPY --from=build /app/node_modules  /app/node_modules
COPY --from=build /app/resources/views   /app/resources/views
COPY --from=build /app/package.json  /app
COPY --from=build /app/public  /app/public
CMD ["pnpm", "start:prod"]
