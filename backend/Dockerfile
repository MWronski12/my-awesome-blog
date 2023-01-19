FROM node:19-alpine

# Create app directory
WORKDIR /backend

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8081
CMD npm start
