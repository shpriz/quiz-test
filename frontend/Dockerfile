# Build stage
FROM node:23-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Установка необходимых пакетов
RUN apk add --no-cache python3 make g++

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Держим контейнер запущенным для сохранения volume
CMD ["tail", "-f", "/dev/null"]