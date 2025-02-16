FROM node:20.11.0-alpine

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

EXPOSE 5000

CMD ["npm", "start"]