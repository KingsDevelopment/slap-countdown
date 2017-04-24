FROM superbuddy/loopback-sdk-builder
MAINTAINER Jurien Hamaker <jurien@kings-dev.io>

ENV APP_DEBUG false

COPY ./api /project
RUN npm install

ENTRYPOINT ["/entrypoint.sh"]
