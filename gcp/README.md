 # Google Cloud setup

*UPDATE: Now using [installcentos](https://github.com/gshipley/installcentos) to have a full 1 node installation.*

 You can find instructions to install google cloud sdk [here](https://cloud.google.com/sdk/downloads#yum).

 You have to add your [ssh keys](https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys).

 Google Cloud full setup is beyond this project , but here you can find a few tips.

#### Firewall rule:
```
gcloud compute firewall-rules create openshift-console --allow tcp:8443 --description "Allow incoming traffic on TCP port 8443" --direction INGRESS --target-tags openshift-console
```

#### Create Instance:
```
gcloud compute instances create breakfix1 --image-family centos-7 --image-project centos-cloud --machine-type n1-standard-4 --tags http-server,https-server,openshift-console --zone europe-west1-b --boot-disk-size=20GB
```

#### Prerrequisites:
```
sed -zi 's/PermitRootLogin no\|$/PermitRootLogin yes/' /etc/ssh/sshd_config
systemctl restart sshd
export DOMAIN=$(curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip).nip.io
export USERNAME=bernard
export PASSWORD=bernoulli
```

#### Install the one node cluster
```
curl https://raw.githubusercontent.com/gshipley/installcentos/master/install-openshift.sh | INTERACTIVE=false /bin/bash
```

#### Setup the openshift projects:

```
oc adm new-project break-fix --display-name='Break & Fix'
oc new-app -f manager-app-template.yaml -n break-fix
oc adm policy add-cluster-role-to-user cluster-admin -z manager-app -n break-fix
oc adm new-project demo --display-name='Demoapp project'
oc create -f demoapp-template.yaml -n demo
oc new-app demoapp-template -n demo
oc adm new-project tty --display-name='Web terminal'
oc adm policy add-cluster-role-to-user cluster-admin -z online-oc -n tty
oc new-app -f tty-template.yaml -n tty
```

The template files are located at the [templates directory](https://github.com/ruromero/break-fix/templates/)

# Accessing the application


* **Manager Application** http://manager-app-break-fix.<your_ip>.nip.io
* **Demo Application** http://demoapp-demo.<your_ip>.nip.io
* **TTY** http://online-oc-tty.<your_ip>.nip.io

```
echo -e "Manager App:\thttp://manager-app-break-fix.apps.$DOMAIN\ndemo app:\thttp://demoapp-demo.apps.$DOMAIN\ntty:\t\thttp://online-oc-tty.apps.$DOMAIN"
```
