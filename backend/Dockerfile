FROM node:18-alpine

# Create app directory
WORKDIR /backend

# Install app dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Bundle app source
COPY . .

ARG PORT
EXPOSE PORT
# Env variables
ENV DB_HOST my-awesome-blog.database.windows.net
ENV DB_USER szekler
ENV DB_PASSWORD mArvinm0d345
ENV DB_NAME my_awesome_blog_db
ENV DB_PORT 1433

ENV CLIENT_ORIGIN https://my-awesome-blog.azurewebsites.net
ENV JWT_SECRET "Poniedziałki bywają okrutne"
ENV PORT 8080

EXPOSE $PORT
CMD npm start
