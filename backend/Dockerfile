FROM node:23-alpine

WORKDIR /app

# Install build dependencies and wait-for-it script
RUN apk add --no-cache python3 make g++ netcat-openbsd

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем все зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Создаем скрипт для проверки доступности базы данных
RUN echo '#!/bin/sh\n\
while ! nc -z mariadb 3306; do\n\
  echo "Waiting for MariaDB to be ready..."\n\
  sleep 1\n\
done\n\
echo "MariaDB is ready!"\n\
npm start' > /app/wait-for-db.sh

RUN chmod +x /app/wait-for-db.sh

EXPOSE 5000

CMD ["/app/wait-for-db.sh"]
