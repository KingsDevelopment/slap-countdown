FROM superbuddy/loopback-sdk-builder
MAINTAINER Jurien Hamaker <jurien@kings-dev.io>

COPY . /project
RUN npm install

ENTRYPOINT ["/entrypoint.sh"]
