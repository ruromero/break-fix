# demoapp

`demoapp` is a simple NodeJS-based application used in the *Break & Fix* workshop. It will be deployed using the [demoapp-template.yaml](../bf-addons/demoapp-template.yaml) file on OpenShift and the `manager-app` will then make
some changes on the cluster or the application objects to make it unavailable.

## The build and deployment process
The [BuildConfig](https://docs.openshift.com/container-platform/3.7/dev_guide/builds/index.html) defines how the application should be built before being deployed. The [S2I](https://docs.openshift.com/container-platform/3.7/creating_images/s2i.html#creating-images-s2i) builder image will clone the repository on the path specified in the `contextDir` and run `npm install`. The result is used to create the image that will be later deployed.

The [DeploymentConfig](https://docs.openshift.com/container-platform/3.7/dev_guide/deployments/how_deployments_work.html) defines where to pull the image from and how it is deployed. How many replicas, how to deploy a new image, how to check the application is successfully deployed ([Health checks using probes](https://docs.openshift.com/container-platform/3.7/dev_guide/application_health.html)).

Once the application is marked as ready (i.e. deployed and healthy), the [Service](https://docs.openshift.com/container-platform/3.7/architecture/core_concepts/pods_and_services.html#services) starts serving requests and load balancing across all the pods matching the `selector`. The [Route](https://docs.openshift.com/container-platform/3.7/architecture/networking/routes.html) provides external access through the router and will forward requests to the `service` being exposed.

## Source code
**Repository:**
* Type: Git
* URL: `https://github.com/ruromero/devconf`
* Context dir: `demoapp`

**Code:**
* Language: Javascript
* Server: NodeJS

**Build:**
* Type: Source to Image (`s2i`)
* Builder image: `centos/nodejs-6-centos7:latest`

## HTTP Requests

**Request**
* PORT: `8080`
* Path: `/`
* Method: `GET`

**Reply**
* Status code: `200 OK`
* Body: `Hello Break & Fix!`

## Deployment

* Replicas: `1`
* Strategy: `Recreate`
* Labels: `app=demoapp`
* **readinessProbe and livenessProbe**
  * HTTP Verb: `GET`
  * Path: '/'
  * Port: `8080`
* Resources Limits/Requests: `none`
