FROM superbuddy/ng-cli-nginx
MAINTAINER Jurien Hamaker <jurien@kings-dev.io>

WORKDIR /project

ADD package.json /project/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install
RUN mv /project/node_modules /node_modules

ENV APP_DEBUG false
ENV AOT true

ADD . /project

RUN mv /project/sdk /project/src/app/sdk

ENTRYPOINT ["/entrypoint.sh"]
