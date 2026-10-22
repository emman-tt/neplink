#Install pnpm dependencies 
FROM node:lts-alpine AS dependencer

RUN corepack enable 

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app


COPY package.json  pnpm-lock.yaml* pnpm-workspace.yaml* .npmrc* ./


RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    corepack enable pnpm && pnpm install --frozen-lockfile; 



#Arrange the app from dependencer
FROM node:lts-alpine AS builder

WORKDIR /app


# Copy project dependencies from dependencer stage
COPY --from=dependencer /app/node_modules ./node_modules

COPY . .

RUN  corepack enable &&  pnpm run  build



FROM node:lts-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3006
ENV HOSTNAME="0.0.0.0"

COPY --from=builder --chown=node:node /app/public ./public

RUN mkdir .next && chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/nginx.conf ./nginx.conf
USER node

USER node
EXPOSE 3006
CMD ["node", "server.js"]

