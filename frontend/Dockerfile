# Build stage
FROM node:23-alpine AS build

WORKDIR /app

# Add necessary build tools
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies with specific npm version
RUN npm install -g npm@latest && \
    npm install --legacy-peer-deps --production=false

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]