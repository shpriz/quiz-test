# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Устанавливаем только необходимое
RUN apk add --no-cache python3

# Копируем package.json
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Production stage
FROM nginx:alpine

# Копируем собранное приложение
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]