# syntax=docker/dockerfile:1.4
# Playwright test runner image
FROM mcr.microsoft.com/playwright:v1.43.0-jammy

WORKDIR /app

# Copy only package files first for better caching
COPY package.json package-lock.json* .npmrc ./

# Cache node_modules across builds
RUN --mount=type=cache,target=/root/.npm \
    npm ci --ignore-scripts

# Copy rest of the source
COPY . .

# Install browsers & deps
RUN --mount=type=cache,target=/root/.cache/ms-playwright \
    npx playwright install --with-deps

CMD ["npm", "test"] 