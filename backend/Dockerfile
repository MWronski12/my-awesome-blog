FROM node:18-alpine

# Create app directory
WORKDIR /backend

# Install app dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Bundle app source
COPY . .

# Env variables
ENV DB_HOST localhost
ENV DB_USER root
ENV DB_PASSWORD 123456
ENV DB_NAME my_awesome_blog_db
ENV DB_PORT 3306

ENV CLIENT_ORIGIN http://localhost
ENV JWT_SECRET Ptaki latają kluczem
ENV PORT 8080

EXPOSE $PORT
CMD npm start
