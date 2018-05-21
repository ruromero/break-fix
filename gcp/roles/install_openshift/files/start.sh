#!/bin/bash
sudo oc cluster up --public-hostname=$(curl -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip) --routing-suffix=$(curl -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip).nip.io
sudo oc login -u system:admin
sudo oc adm policy add-role-to-user admin developer -n demo
