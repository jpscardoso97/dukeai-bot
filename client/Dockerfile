# Use the latest LTS version of Node.js as the base image
FROM node:16.6.0-slim as build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight nginx image as the base for the final image
FROM nginx:stable-alpine

# Copy the build output from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default nginx port
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]