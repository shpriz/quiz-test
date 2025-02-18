FROM node:23-alpine

WORKDIR /app

# Install build dependencies and netcat for DB check
RUN apk add --no-cache python3 make g++ netcat-openbsd

# Копируем только package файлы для кэширования слоя с зависимостями
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем исходный код
COPY . .

# Создаем скрипт для проверки доступности базы данных
RUN echo '#!/bin/sh\n\
while ! nc -z mariadb 3306; do\n\
  echo "Waiting for MariaDB..."\n\
  sleep 1\n\
done\n\
echo "MariaDB is ready!"\n\
exec npm start' > entrypoint.sh \
    && chmod +x entrypoint.sh

EXPOSE 5000

CMD ["./entrypoint.sh"]
