1. Set a new MINISHIFT_HOME and copy the content from the USB Drive
```
export MINISHIFT_HOME=$HOME/minishift_home
mkdir -p $MINISHIFT_HOME/cache
cp -rv usb/cache/* $MINISHIFT_HOME/cache/
cp -rv usb/bf-addons* $MINISHIFT_HOME/
cd $MINISHIFT_HOME
```

2. Copy the proper minishift binary to $MINISHIFT_HOME.

3. Set the variables to specify a new profile, specific openshift version, use image-caching and which images to use 
```
./minishift profile set bf37
./minishift config set openshift-version v3.7.1
./minishift config set image-caching true
./minishift image cache-config add centos/nodejs-6-centos7:latest openshift/origin-deployer:v3.7.1 openshift/origin-docker-registry:v3.7.1 openshift/origin-haproxy-router:v3.7.1 openshift/origin-pod:v3.7.1 openshift/origin-sti-builder:v3.7.1 openshift/origin:v3.7.1 ruromero/manager-app:3.7.1
```

4.  Start the profile and install and apply the addon 

```
./minishift start --profile bf37
./minishift addons install bf-addons371/
./minishift addons apply bf-devconf
```

5. Wait until all the applications are running

  ```
  $ oc get pods -n break-fix --as system:admin -l app=manager-app -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.phase}{"\n"}{end}'
  manager-app-1-19jhw   Running

  $ oc get pods -n demo --as system:admin -l app=demoapp -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.phase}{"\n"}{end}'
  demoapp-1-j4xlx       Running
  ```

