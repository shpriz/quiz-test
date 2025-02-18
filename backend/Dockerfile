# Build stage
FROM node:23-alpine

WORKDIR /app

# Add necessary tools
RUN apk add --no-cache python3 make g++ netcat-openbsd

# Copy package files
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force && \
    npm install --legacy-peer-deps --no-audit --no-fund

# Copy source code
COPY . .

# Create node user
RUN chown -R node:node /app
USER node

# Expose port 5000
EXPOSE 5000

# Copy and prepare wait-for-it script
COPY --chown=node:node wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Start application
CMD ["/wait-for-it.sh", "db:3306", "--", "node", "src/server.js"]
