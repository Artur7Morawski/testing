# syntax=docker/dockerfile:1.4
# Playwright Java test runner image
FROM mcr.microsoft.com/playwright/java:v1.43.0-jammy

ENV CI=true

WORKDIR /app

# Copy Maven build files first for better caching
COPY pom.xml ./

# Pre-fetch Maven dependencies
RUN --mount=type=cache,target=/root/.m2 \
    mvn -B dependency:go-offline

# Copy the source
COPY src ./src
COPY src/test/resources ./src/test/resources

# Run tests
RUN --mount=type=cache,target=/root/.m2 \
    mvn -B test

CMD ["mvn", "-B", "test"] 