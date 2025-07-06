# ---- Stage 1: Build the application ----
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install ALL dependencies (including devDependencies)
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Run the build script
RUN npm run build

# ---- Stage 2: Create the final production image ----
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install ONLY production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the built application from the 'builder' stage
COPY --from=builder /app/build ./build
# Note: If your build output is in a 'dist' folder, change the line above to:
# COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]