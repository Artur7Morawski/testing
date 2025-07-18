# syntax=docker/dockerfile:1.4
# Playwright Python test runner image
FROM mcr.microsoft.com/playwright/python:v1.43.0-jammy

ENV CI=true

WORKDIR /app

# Copy requirements separately for better layer caching
COPY requirements.txt ./

# Cache pip packages across builds
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Install browsers & deps (already present in base, but ensure cache layer)
RUN --mount=type=cache,id=wiki-playwright-python-browsers,target=/root/.cache/ms-playwright \
    playwright install --with-deps

CMD ["pytest"] 