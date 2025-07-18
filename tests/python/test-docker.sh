#!/usr/bin/env bash
# Build the Docker image for Python Playwright tests and run the suite inside it.
# Usage: ./test-docker.sh [pytest arguments]
set -euo pipefail

IMAGE_NAME=wiki-playwright-tests-python

DOCKER_BUILDKIT=1 docker build --progress=plain -t "$IMAGE_NAME" .
# Forward any extra CLI args to pytest inside the container.
docker run --rm -it --ipc=host "$IMAGE_NAME" "$@" 