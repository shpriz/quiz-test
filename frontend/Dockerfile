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

# Проверяем наличие TypeScript
RUN npm list typescript || npm install -D typescript

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]