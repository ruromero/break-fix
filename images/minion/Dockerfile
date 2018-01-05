FROM alpine:3.7

LABEL AUTHOR="Ruben Romero Montes <rromerom@redhat.com>"

ENV HOME=/opt/app-root \
    SERVER_PORT=8000 \
    LEVEL=0

RUN mkdir -p ${HOME}/html && \
    apk add --no-cache python

WORKDIR ${HOME}

COPY files ${HOME}

RUN adduser -u 1000 -D python && \
    chown -R python:python ${HOME}

# Intentionally remove `other` permissions for demo purposes
RUN chmod o-x run.sh

USER 1000

CMD ["./run.sh"]
