# Break and Fix offline install

1. Set a new MINISHIFT_HOME and copy the content from the USB Drive

```[bash]
export MINISHIFT_HOME=$HOME/minishift_home
cp -rv usb/minishift_home.tar.gz $HOME
tar -xvf $HOME/minishift_home.tar.gz -C $HOME
```

1. Copy the proper minishift binary, you have copies on the pendrives.

1. Start Minishift and apply the addon

  ```[bash]
  ./minishift start
  ./minishift addons apply break-fix
  ```

1. Ensure that you are using the openshift client matching the minishift version, in this case v3.9.0, you have copies on the pendrives.

1. Wait until all the applications are running

  ```[bash]
  $ oc get pods -n break-fix --as system:admin -l app=manager-app -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.phase}{"\n"}{end}'
  manager-app-1-19jhw   Running

  $ oc get pods -n demo --as system:admin -l app=demoapp -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.phase}{"\n"}{end}'
  demoapp-1-j4xlx       Running
  ```
