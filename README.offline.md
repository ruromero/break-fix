1. Set a new MINISHIFT_HOME and copy the content from the USB Drive
```
export MINISHIFT_HOME=$HOME/minishift_home
mkdir -p $MINISHIFT_HOME
cp -rv usb/minishift/* $MINISHIFT_HOME/
cd $MISHIFT_HOME
```

2. Copy the proper minishift binary to $MINISHIFT_HOME, you have copies on the pendrives.

3.  Start Minishift and apply the addon

  ```
  ./minishift start
  ./minishift addons apply bf-devconf
  ```

4. Ensure that you are using the openshift client matching the minishift version, in this case v3.7.1, you have copies on the pendrives.

5. Wait until all the applications are running

  ```
  $ oc get pods -n break-fix --as system:admin -l app=manager-app -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.phase}{"\n"}{end}'
  manager-app-1-19jhw   Running

  $ oc get pods -n demo --as system:admin -l app=demoapp -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.phase}{"\n"}{end}'
  demoapp-1-j4xlx       Running
  ```
