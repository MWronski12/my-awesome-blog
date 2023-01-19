# Stage 1
FROM node:19-alpine as build-stage

WORKDIR /frontend
COPY package*.json .
RUN npm ci
COPY . .

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV NODE_ENV=production

RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /frontend/build /usr/share/nginx/html
EXPOSE $FRONTEND_DOCKER_PORT

CMD nginx -g 'daemon off;'
