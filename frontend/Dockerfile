# Build stage
FROM node:23-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY package*.json ./

# Устанавливаем все зависимости (включая devDependencies)
RUN npm install

# Копируем исходный код
COPY . .

# Создаем production build
RUN npm run build

# Production stage
FROM nginx:alpine

# Копируем собранное приложение
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]