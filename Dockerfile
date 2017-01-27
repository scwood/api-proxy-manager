FROM registry-app.eng.qops.net:5001/base-profserv/node/6.9:latest

MAINTAINER lancew@qualtrics.com

WORKDIR /home/default

# Have to initialize build time arguments like so
# https://docs.docker.com/engine/reference/commandline/build/#/set-build-time-variables---build-arg
ARG SET_NODE_ENV
ENV NODE_ENV=${SET_NODE_ENV}

# Install latest npm
RUN curl -L https://npmjs.org/install.sh | sh

# Only copy in files needed for npm install - this will decrease build time by building from cache if these files have not changed
COPY ./package.json /home/default/package.json
COPY ./npm-shrinkwrap.json /home/default/npm-shrinkwrap.json

# npm install (based on NODE_ENV environment envariable, either exclude/include dev dependencies)
RUN npm install

# App Build - (if you have a build process)
#RUN npm run build-app

# Get everything in current directory that's not in .dockerignore
COPY . /home/default

# Expose port
EXPOSE 80
ENV EXPRESS_PORT=80

# Default command to run for non-dev environments
# https://docs.docker.com/engine/reference/builder/
CMD ["npm start"]