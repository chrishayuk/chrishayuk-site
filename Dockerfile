FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY vendor/hause ./vendor/hause
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG GIT_COMMIT=""
ENV NEXT_TELEMETRY_DISABLED=1 SITE_INDEXABLE=true GIT_COMMIT=$GIT_COMMIT
RUN npm run build:fly

FROM node:22-alpine AS run
WORKDIR /app
ARG GIT_COMMIT=""
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 SITE_INDEXABLE=true GIT_COMMIT=$GIT_COMMIT NEXT_TELEMETRY_DISABLED=1
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
