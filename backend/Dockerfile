FROM node:19-alpine

# Create app directory
WORKDIR /backend

# Install app dependencies
COPY package*.json ./
RUN npm i

# Bundle app source
COPY . .

EXPOSE 8081
CMD npm start
