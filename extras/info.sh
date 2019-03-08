for ip in `GCE_INI_PATH=~/.ansible/inventory/gce.ini ~/.ansible/inventory/gce.py --list --pretty | jq '._meta.hostvars[] | select(.gce_tags[] | contains("break-fix")) | .gce_public_ip' -r`
do
  echo MACHINE: $ip
  echo -e "Manager App:\thttp://manager-app-break-fix.$ip.nip.io"
  echo -e "demo app:\thttp://demoapp-demo.$ip.nip.io"
  echo -e "tty:\t\thttp://online-oc-tty.$ip.nip.io"
  echo
done
