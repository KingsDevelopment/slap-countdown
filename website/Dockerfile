FROM superbuddy/ng-cli-nginx
MAINTAINER Jurien Hamaker <jurien@kings-dev.io>

ENV APP_DEBUG false
ENV AOT true

COPY . /project

RUN ls

RUN mv /project/sdk /project/src/app/sdk

RUN npm install
#RUN npm test

ENTRYPOINT ["/entrypoint.sh"]
