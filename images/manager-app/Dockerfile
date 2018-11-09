FROM centos/nodejs-8-centos7

LABEL author="Ruben Romero Montes <rromerom@redhat.com>"

ENV OC_TOOL=openshift-origin-client-tools-v3.9.0-191fece-linux-64bit \
    PATH=$PATH:$APP_ROOT/etc/oc-tool \
    INSTALL_DIR=/opt/rh/rh-nodejs8/root/usr/bin

ADD https://github.com/openshift/origin/releases/download/v3.9.0/$OC_TOOL.tar.gz $APP_ROOT/etc

USER root

RUN tar -xf $APP_ROOT/etc/$OC_TOOL.tar.gz -C $APP_ROOT/etc && \
    mv $APP_ROOT/etc/$OC_TOOL $APP_ROOT/etc/oc-tool && \
    git clone https://github.com/ruromero/break-fix break-fix && \
    chown 1001 -R break-fix && \
    cp -r break-fix/manager-app/.  . && \
    rm -rf break-fix

USER 1001

ADD assemble.sh $HOME/
RUN $HOME/assemble.sh

CMD $STI_SCRIPTS_PATH/run
