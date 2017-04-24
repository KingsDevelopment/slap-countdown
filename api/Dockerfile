FROM superbuddy/loopback-sdk-builder
MAINTAINER Jurien Hamaker <jurien@kings-dev.io>

ENV APP_DEBUG false

COPY . /project

RUN ls

RUN npm install

ENTRYPOINT ["/entrypoint.sh"]
