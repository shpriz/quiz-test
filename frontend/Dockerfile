# Build stage
FROM node:23-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build || (echo "Build failed" && cat /app/tsconfig.json && exit 1)

# Production stage
FROM nginx:alpine

# Копируем собранное приложение
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Проверяем конфигурацию nginx
RUN nginx -t

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]