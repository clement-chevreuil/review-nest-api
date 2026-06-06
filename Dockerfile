ARG NPM_INSTALL_FLAGS=""

# Étape 1 : build des sources
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install ${NPM_INSTALL_FLAGS}
COPY . .
RUN npm run build

# Étape 2 : image finale
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/views ./views
COPY package*.json ./
EXPOSE 5113
CMD ["node", "dist/main.js"]