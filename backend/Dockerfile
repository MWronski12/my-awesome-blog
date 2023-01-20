FROM node:18-alpine

# Create app directory
WORKDIR /backend

# Install app dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE $BACKEND_DOCKER_PORT
CMD npm start
