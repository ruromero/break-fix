# Export images
```
./minishift profile set bf-devconf
./minishift config set openshift-version v3.7.1
./minishift config set image-caching true
```
Copy **profiles/bf-devconf** -> empty profile with properties set
```
./minishift start
```

```
./minishift image export centos/nodejs-6-centos7:latest \
  openshift/origin-deployer:v3.6.1  openshift/origin-deployer:v3.7.1 \
  openshift/origin-docker-registry:v3.6.1 openshift/origin-docker-registry:v3.7.1  \
  openshift/origin-haproxy-router:v3.6.1 openshift/origin-haproxy-router:v3.7.1 \
  openshift/origin-pod:v3.6.1 openshift/origin-pod:v3.7.1 \
  openshift/origin-sti-builder:v3.6.1 openshift/origin-sti-builder:v3.7.1 \
  openshift/origin:v3.6.1 openshift/origin:v3.7.1 \
  ruromero/manager-app:3.6.1 ruromero/manager-app:3.7.1 ruromero/manager-app:latest
```
Images are saved into ~/.minishift/cache/images/blobs

Copy
* ~/.minishift/cache to minishift_home/cache -> images exported, downloaded iso and oc client (add other platforms)
* ~/.minishift/config to minishift_home/config -> default profile to be used

# Clients
Download the right oc clients from github and copy them into  minishift_home/cache/v3.7.1/{linux,windows,darwin}

# Offline minishift
```
$ export MINISHIFT_HOME=`pwd`/minishift_home
$ ./minishift image cache-config add centos/nodejs-6-centos7:latest openshift/origin-deployer:v3.7.1 openshift/origin-docker-registry:v3.7.1 openshift/origin-haproxy-router:v3.7.1 openshift/origin-pod:v3.7.1 openshift/origin-sti-builder:v3.7.1 openshift/origin:v3.7.1 ruromero/manager-app:latest
$ ./minishift start
```
