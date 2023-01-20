# Stage 1
FROM node:18-alpine as node

WORKDIR /frontend
COPY package*.json .
RUN npm ci --ommit=dev
COPY . .

ARG API_BASE_URL
RUN echo VITE_API_BASE_URL=$API_BASE_URL > .env

RUN npm run build

# Stage 2
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=node /frontend/dist .
EXPOSE $FRONTEND_DOCKER_PORT
# run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
