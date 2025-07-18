# Wikipedia Playwright Test Suite (Java)

Java 17 implementation of the Wikipedia checks found in the TypeScript and Python suites. Uses:

* **Playwright Java 1.43**
* **JUnit 5** (parameterised tests)
* **Maven** build

---
## Quick start

```bash
cd tests/java
mvn -B test             # downloads browsers automatically on first run
```

Run a single test class / method:

```bash
mvn -B test -Dtest=WikiHeadingsTest
mvn -B test -Dtest=WikiStructureTest#verifyStructure
```

### Parallel execution

JUnit 5 can run tests in parallel. Add this to `pom.xml` inside `<configuration>` of the Surefire plugin if you want CPU-wide concurrency:

```xml
<configuration>
  <parallel>classes</parallel>
  <threadCount>4</threadCount>
</configuration>
```

---
## Docker

Build and run in a container (no local Java / Playwright install required):

```bash
cd tests/java
chmod +x test-docker.sh   # first time only
a./test-docker.sh         # builds image + runs tests
./test-docker.sh -Dtest=WikiHeadingsTest      # forward Maven args
```

The Dockerfile uses cache mounts for the local Maven repository and Playwright browsers: follow-up builds are significantly faster.

---
## Project Structure

```
 tests/java/
 │
 ├── src/
 │   └── test/
 │       ├── java/
 │       │   ├── config/           # TIMEOUTS constants
 │       │   ├── pages/            # Page-object classes (BasePage, WikiPage)
 │       │   ├── tests/            # JUnit tests
 │       │   └── util/             # JSON data provider
 │       └── resources/            # wiki_articles.json
 │
 ├── pom.xml                       # Maven build file
 ├── Dockerfile                    # Container image
 └── test-docker.sh                # Helper script
``` 