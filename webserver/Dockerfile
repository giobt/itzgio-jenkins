# Set the base image to Ubuntu
FROM ubuntu

# File Author / Maintainer
MAINTAINER Giorgio Balconi

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install curl && \
    curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get install -y nodejs

# Install nodemon
RUN npm install -g nodemon

# Provides cached layer for node_modules
ADD /app/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# Define working directory
WORKDIR /src
ADD /app /src

# Expose port
EXPOSE  8080

VOLUME ["/src"]

# Run app using nodemon
CMD ["nodemon", "/src/server.js"]