FROM centos/nodejs-8-centos7

LABEL author="Ruben Romero Montes <rromerom@redhat.com>"

USER root

RUN git clone https://github.com/ruromero/break-fix break-fix && \
    chown 1001 -R break-fix && \
    cp -r break-fix/scoreboard/.  . && \
    rm -rf break-fix

USER 1001

ADD assemble.sh $HOME/
RUN $HOME/assemble.sh

CMD $STI_SCRIPTS_PATH/run
