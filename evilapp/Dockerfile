FROM openshift/origin

MAINTAINER Ruben Romero Montes <rromerom@redhat.com>

RUN useradd openshift --uid 1000

RUN mkdir -p /var/lib/origin/openshift.local.config && \
 chown 1000:1000 /var/lib/origin/openshift.local.config

USER 1000

ENTRYPOINT []

CMD ["while true; do sleep 1000; done"]
