# Stage 1: Build the React app
FROM node:23 AS build

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY .env ./

RUN npm install

COPY . ./

RUN npm run build

# Stage 2: Serve the React app with nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
