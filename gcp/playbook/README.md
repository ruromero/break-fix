# Provision lab on GCP - Playbook

## Requirements

Create a Service Account with the following Roles:
* Service Account User
* Compute Engine Admin

Generate the private key (JSON) and export the following Environment Variables:

```
GCE_PROJECT=<project_id>
GCE_EMAIL=<service_account_email>
GCE_CREDENTIALS_FILE_PATH=/path/to/sa-key.json
```

In order to confirm the Service Account works you can login and try to list the zones like this:
```
$ gcloud auth activate-service-account <service_account_email> --key-file=/path/to/sa-key.json
$ gcloud compute zones list
NAME                       REGION                   STATUS  NEXT_MAINTENANCE  TURNDOWN_DATE
us-east1-b                 us-east1                 UP
us-east1-c                 us-east1                 UP
...
```
