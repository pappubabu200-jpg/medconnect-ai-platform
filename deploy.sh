#!/usr/bin/env bash
set -e
# Build and push images to GHCR then deploy via helm
IMAGE_API=ghcr.io/your-org/medconnect-api:latest
IMAGE_AI=ghcr.io/your-org/medconnect-ai:latest

docker build -t $IMAGE_API services/api
docker build -t $IMAGE_AI services/ai

docker push $IMAGE_API
docker push $IMAGE_AI

# helm upgrade
helm upgrade --install medconnect-api infra/helm/api --set image.repository=ghcr.io/your-org/medconnect-api --set image.tag=latest --namespace medconnect --create-namespace
helm upgrade --install medconnect-ai infra/helm/ai --set image.repository=ghcr.io/your-org/medconnect-ai --set image.tag=latest --namespace medconnect
