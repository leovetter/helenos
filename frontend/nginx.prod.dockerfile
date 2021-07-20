##### Stage 1
FROM node:latest as node
LABEL author="Léo Vetter"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod --configuration=prod

##### Stage 2
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist /usr/share/nginx/html
COPY ./config/nginx.prod.conf /etc/nginx/conf.d/default.conf