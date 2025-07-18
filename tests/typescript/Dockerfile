# Playwright test runner image
FROM mcr.microsoft.com/playwright:v1.43.0-jammy

WORKDIR /app

# Copy only package files first for better caching
COPY package.json package-lock.json* .npmrc ./

RUN npm ci --ignore-scripts

# Copy rest of the source
COPY . .

# Install browsers & deps
RUN npx playwright install --with-deps

CMD ["npm", "test"] 