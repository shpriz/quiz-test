# Build stage
FROM node:23-alpine as build

WORKDIR /app

# Добавляем python и build tools
RUN apk add --no-cache python3 make g++

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем исходный код
COPY . .

# Production stage
FROM node:23-alpine

WORKDIR /app

# Добавляем netcat для wait-for-it.sh
RUN apk add --no-cache netcat-openbsd

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm install --only=production --legacy-peer-deps

# Копируем собранное приложение из build stage
COPY --from=build /app/src ./src

# Создаем пользователя node
RUN chown -R node:node /app
USER node

# Экспортируем порт 5000
EXPOSE 5000

# Скрипт для ожидания MariaDB
COPY --chown=node:node wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Запускаем приложение
CMD ["/wait-for-it.sh", "db:3306", "--", "node", "src/server.js"]
