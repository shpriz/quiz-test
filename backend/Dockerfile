FROM node:22-alpine

WORKDIR /app

# Install build dependencies and netcat for DB check
RUN apk add --no-cache python3 make g++ netcat-openbsd

# Копируем только package файлы для кэширования слоя с зависимостями
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем исходный код
COPY . .

EXPOSE 5000

# Запускаем напрямую через shell
CMD sh -c 'while ! nc -z mariadb 3306; do echo "Waiting for MariaDB..."; sleep 1; done; echo "MariaDB is ready!"; npm start'
