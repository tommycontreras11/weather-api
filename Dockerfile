# Use official Node image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port from env (fallback 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]