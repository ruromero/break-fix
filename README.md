# Break & Fix with OpenShift

This is a set of utilities and resources to be used during the [**Break & Fix with OpenShift**](https://devconfcz2018.sched.com/event/DJX6/breakfix-with-openshift) workshop that will take place at [DevConf.cz](https://devconf.cz/) 2018

## The event
Have you ever considered running an OpenShift cluster? Are you scared by the complexity? Join us in this workshop to break and fix some stuff to gain the confidence you need.

Each assistant will start with a non-working OpenShift cluster and the final target will be to run a provided containerized web application after we solve several small and related issues.

Hints will be provided every few minutes and there will be a mechanism to check current progress of the challenge.

Assistants will learn some troubleshooting techniques and experience how to solve some of the most common OpenShift operational and development problems.

## The lab
This laboratory is intended to be deployed using [minishift](https://github.com/minishift/minishift) as an add-on. The add-on will create all the necessary resources to get you started.

* Create a new project `break-fix`
* Create a service account with cluster-admin role
* Deploy the `manager-app` application (see [manager-app](#manager-app)) that will use the previously created service account
* Deploy the `demoapp` on the `demo` namespace (project)

## Getting started
1. Install the latest version of  [minishift](https://github.com/minishift/minishift)

  ```
  ./minishift start --profile bfdevconf
  -- Starting profile 'bfdevconf'
  -- Checking if requested hypervisor 'kvm' is supported on this platform ... OK
  -- Checking if KVM driver is installed ...
     Driver is available at /usr/local/bin/docker-machine-driver-kvm ...
  [...OUTPUT OMITTED...]
  OpenShift server started.

  The server is accessible via web console at:
      https://192.168.42.95:8443

  You are logged in as:
      User:     developer
      Password: <any value>

  To login as administrator:
      oc login -u system:admin
  ```

2. Download the add-on and install it. Check the [latest release](https://github.com/ruromero/devconf/releases/latest):

  ```
  $ wget https://github.com/ruromero/devconf/releases/download/v1.1/bf-addons.tar.gz
  $ tar -xf bf-addons.tar.gz
  $ ./minishift addons install bf-addons
  Addon 'bf-devconf' installed
  $ ./minishift addons apply bf-devconf
  -- Applying addon 'bf-devconf':..........
  ```

3. Wait until all the applications are running

  ```
  $ oc get pods -n break-fix --as system:admin -l app=manager-app -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.phase}{"\n"}{end}'
  manager-app-1-19jhw	Running

  $ oc get pods -n demo --as system:admin -l app=demoapp -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.phase}{"\n"}{end}'
  demoapp-1-j4xlx	Running
  ```

4. Access the `manager-app` and start breaking OpenShift

  ```
  $ oc get routes -n break-fix --as system:admin
  NAME          HOST/PORT                                    PATH      SERVICES      PORT       TERMINATION   WILDCARD
  manager-app   manager-app-break-fix.192.168.42.95.nip.io             manager-app   8080-tcp                 None
  ```

  Open the route in your favourite browser http://manager-app-break-fix.192.168.42.95.nip.io

  ![manager-app animation](https://github.com/ruromero/devconf/raw/master/extras/Break%26Fix_demo.gif)


## manager-app
The `manager-app` is a web application that drive you through the workshop. It will break the application and check when it has been fixed. All your progress is stored **in your browser**. If you want to start over, you can click the `Reset` button. Cleaning the cache or the cookies won't be enough as it uses the `localStorage`.

### Start
1. Type some **username** to be used when sharing the scores
2. To start, select **New game**
3. Enter the **master password** that will be provided during the workshop to unlock the first level

### Levels
Each level will break the `demoapp` or some element that will prevent it from being accessible through its route.
* **Break**: Will execute some `oc` commands that will break the `demoapp` and you will have **10 minutes** to fix it (if you want to get some points).
* **Check**: Tries to access the `demoapp` through it's route (to verify the end-2-end health of the application). If it succeeds you will get 1 point for each second left and you will be able to move to the next level.
* **Give up**: Will revert the changes made by the **Break** commands and you will be able to move forward to the next level but you won't get any points.

### The Docker images
The Docker images are also published in Docker Hub
* [ruromero/nodejs-6-oc](https://hub.docker.com/r/ruromero/nodejs-6-oc/): An extension of the base s2i image for nodejs which installs the `oc` client.
* [ruromero/manager-app](https://hub.docker.com/r/ruromero/manager-app/): An image extending [ruromero/nodejs-6-oc](https://hub.docker.com/r/ruromero/nodejs-6-oc/) that downloads and builds the source code.
