# Use the official Node.js image as a base
FROM node:21-alpine3.19

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY ./Mosahem .

# Install dependencies
RUN npm install

# Start the React Native app
CMD ["npx", "expo", "start"]
