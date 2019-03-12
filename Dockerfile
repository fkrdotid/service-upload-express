# Using latest Node.js image
FROM node:latest

# Set environment variable during build process
ARG NODE_ENV
ENV NODE_ENV "$NODE_ENV"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Bundle app source
COPY . .

# Run application
EXPOSE 9001 10001
CMD [ "npm", "start" ]
