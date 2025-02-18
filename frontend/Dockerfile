# Build stage
FROM node:23-alpine AS build

WORKDIR /app

# Add necessary build tools
RUN apk add --no-cache python3 make g++

# Install yarn
RUN npm install -g yarn

# Copy package files
COPY package*.json ./

# Install dependencies
RUN yarn install --network-timeout 1000000

# Copy source code
COPY . .

# Build application
RUN yarn build

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