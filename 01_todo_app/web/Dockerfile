# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14.19 as build-stage
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install --pure-lockfile
COPY ./ /app/
RUN yarn build
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
COPY run_web.sh /bin/run_web.sh
RUN chmod a+x /bin/run_web.sh