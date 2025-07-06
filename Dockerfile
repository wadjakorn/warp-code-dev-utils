# Use official Node.js runtime as a base image
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and install all dependencies
# We need devDependencies for the dev server
COPY package*.json ./
RUN npm install

# Expose port 3000
EXPOSE 3000

# The command to start the dev server
CMD ["npm", "start"]