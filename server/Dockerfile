# Use the latest LTS version of Node.js as the base image
FROM node:18-slim

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY src/package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code
COPY ./src .

EXPOSE 3000

# Set the command to start the application
CMD ["npm", "start"]