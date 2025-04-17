# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.12.0

# Base stage: uses Node.js image
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

# Dependencies stage: installs dependencies
FROM base as deps

# Ensure the destination is a directory when copying multiple files
COPY package.json package-lock.json ./ 

# Skip lifecycle scripts like "prepare" (which calls husky)
ENV npm_config_ignore_scripts=true

# Install production dependencies
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

# Build stage: copies code and builds the project
FROM deps as build

# Copy everything, including .env file
COPY . .  
# This will copy everything from your local directory to the container

RUN --mount=type=cache,target=/root/.npm npm ci
RUN npm run build

# Final stage: sets up the production environment
FROM base as final

ENV NODE_ENV=production

# Switch to root user to modify permissions
USER root

# Ensure the destination directory for logs exists and has proper permissions
RUN mkdir -p /usr/src/app/logs && chown -R node:node /usr/src/app

# Switch back to the node user after ensuring permissions
USER node

# Copy package.json and node_modules from deps stage
COPY package.json ./ 
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy build artifacts from build stage
COPY --from=build /usr/src/app/build ./build

# Ensure the .env file is copied into the working directory
COPY .env ./  

# Expose port 3000 for the app to run on
EXPOSE 3000

# Start the application
CMD npm start
