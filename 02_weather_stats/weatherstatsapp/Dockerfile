# Use node base image
FROM node:16-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY weather/package*.json ./

# Install dependencies
RUN npm i

# Copy source files
COPY weather .

# Build the project
RUN npm run build

# Use Nginx base image
FROM nginx:1.19-alpine

# Copy built files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
