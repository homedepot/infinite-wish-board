#!/bin/sh
# Login to GCP
gcloud auth activate-service-account maw-hackathon@demo.homedepot.com --key-file=gae.json

# Deploy API
cd ./api
gcloud app deploy

# Deploy UI
# cd ./ui
# gcloud app deploy