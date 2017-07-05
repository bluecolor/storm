FROM node:argon
RUN mkdir -p /usr/src/app    && \
    npm install -g coffee-script && \
    ln -s /usr/bin/nodejs /usr/bin/node && \
    apt-get update && \
    apt-get install -y build-essential g++ make python openjdk-7-jdk && \
    npm install -g node-gyp

WORKDIR /usr/src/app
COPY storm /usr/src/app

RUN  echo -e "export LD_LIBRARY_PATH=/usr/lib/jvm/java-7-openjdk-amd64/jre/lib/amd64/server/\n$(cat /usr/src/app/storm)" > /usr/src/app/storm
