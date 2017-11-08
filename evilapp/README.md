## From dockerfile to application

1. create build from dockerfile
`cat Dockerfile | oc new-build --to demoapp -D -`
2. create application from build
`oc new-app demoapp`
3. create sa devconf
`oc create sa devconf`
4. patch the application to use the service account
`oc patch dc/demoapp -p='{"spec":{"template":{"spec":{"serviceAccountName":"devconf"}}}}'`
5. add to the dc the oc url
`oc env dc/demoapp OC_URL=https://192.168.42.86:8443`
6. grant cluster-admin role to serviceaccount
`oc adm policy add-cluster-role-to-user cluster-admin -z devconf`

## Inside the application
1. Login
`oc login --token=`cat /run/secrets/kubernetes.io/serviceaccount/token` --insecure-skip-tls-verify $OC_URL`
