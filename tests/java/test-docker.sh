#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME=wiki-playwright-tests-java

DOCKER_BUILDKIT=1 docker build --progress=plain -t "$IMAGE_NAME" .
docker run --rm -it --ipc=host "$IMAGE_NAME" "$@" 