FROM node:23-alpine

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем все зависимости (включая devDependencies)
RUN npm install

# Копируем исходный код
COPY . .

EXPOSE 5000

# Ждем пока база данных запустится
CMD ["sh", "-c", "sleep 10 && npm start"]
