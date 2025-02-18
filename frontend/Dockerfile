# Build stage
FROM node:23-alpine as build

WORKDIR /app

# Add necessary build tools and python
RUN apk add --no-cache python3 make g++ git

# Copy package files
COPY package*.json ./

# Clear npm cache and install dependencies with specific flags
RUN npm cache clean --force && \
    npm install --legacy-peer-deps --no-audit --no-fund

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