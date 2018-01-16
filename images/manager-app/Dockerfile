FROM centos/nodejs-6-centos7

MAINTAINER Ruben Romero Montes <rromerom@redhat.com>

ENV OC_TOOL=openshift-origin-client-tools-v3.7.0-7ed6862-linux-64bit \
    PATH=$PATH:$APP_ROOT/etc/oc-tool \
    INSTALL_DIR=/opt/rh/rh-nodejs6/root/usr/bin

ADD https://github.com/openshift/origin/releases/download/v3.7.0/$OC_TOOL.tar.gz $APP_ROOT/etc

USER root

RUN tar -xf $APP_ROOT/etc/$OC_TOOL.tar.gz -C $APP_ROOT/etc && \
    mv $APP_ROOT/etc/$OC_TOOL $APP_ROOT/etc/oc-tool && \
    git clone https://github.com/ruromero/devconf devconf && \
    chown 1001 -R devconf && \
    cp -r devconf/manager-app/.  . && \
    rm -rf devconf

USER 1001

ADD assemble.sh $HOME/
RUN $HOME/assemble.sh

CMD $STI_SCRIPTS_PATH/run
