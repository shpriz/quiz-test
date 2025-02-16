# Build stage
FROM node:20.11.0-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Устанавливаем необходимые пакеты
RUN apk add --no-cache python3 make g++

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Создаем production build
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Копируем собранное приложение
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Указываем порт
EXPOSE 5173

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]