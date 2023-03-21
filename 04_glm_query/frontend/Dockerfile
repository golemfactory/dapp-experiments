# Stage 1: Build the Next.js app
FROM node:14-alpine AS build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the static files with nginx
FROM nginx:1.21.3-alpine

COPY --from=build /app/out /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
