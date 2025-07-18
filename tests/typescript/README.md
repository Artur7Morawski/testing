# Wikipedia Playwright Test Suite

This project hosts a TypeScript Playwright test suite that validates a selection of Wikipedia articles.  
It demonstrates:

* Page-object pattern (`src/pages/`)
* JSON-driven test data (`src/data/wiki-articles.json`)
* Linting & custom ESLint rules (flat config)
* Parallel execution with multiple workers

---
## Prerequisites

1. **Node 18 (LTS)** or newer – Playwright & ESLint require a modern Node runtime.
2. **pnpm / npm / yarn** – any Node package manager.
3. macOS/Linux/Windows. (CI friendly.)

---
## Installation

```bash
cd tests/typescript     # project root for the test suite
npm install             # installs Playwright + dependencies
npx playwright install  # downloads browser binaries (Chromium, Firefox, WebKit)
```

> The first `npm install` uses an `.npmrc` that enables `legacy-peer-deps` so peer-dependency clashes are resolved automatically.

---
## Running the Suite

### 1. Headless (default)

```bash
npm test
```

* Runs ESLint (`npm run lint`) followed by Playwright tests.
* Executes **in parallel** on **4 workers** (configured in `playwright.config.ts`).
* Generates an HTML report in `playwright-report/` (open manually or with `npx playwright show-report`).

### 2. Headed / Debug mode

```bash
npm run test:headed
```

* Launches browsers with a GUI (`--headed`).
* Useful for local debugging.

### 3. Specific files or grep

```bash
npx playwright test src/tests/wiki-headings.spec.ts            # single file
npx playwright test -g "Wikipedia Article Structure"           # by title / grep
```

---
## Linting

```bash
npm run lint            # checks all *.ts files
npm run lint -- --fix   # auto-fix where possible
```

Key style rules:

* **No semicolons** (`semi: never`)
* No unused imports (`eslint-plugin-unused-imports`)
* Playwright best-practices (`eslint-plugin-playwright`)
* Custom rules to avoid redundant waits & flaky APIs

---
## Project Structure

```
 tests/typescript/
 │
 ├── src/
 │   ├── data/                 # JSON files driving test data
 │   ├── pages/                # Page-object classes
 │   └── tests/                # Playwright specs
 │
 ├── tools/
 │   └── eslint-rules/         # Custom ESLint rules
 │
 ├── playwright.config.ts      # Playwright configuration (4 workers, baseURL)
 ├── tsconfig.json             # TypeScript compiler options
 ├── eslint.config.js          # Flat ESLint configuration
 └── package.json              # npm scripts & devDependencies
```

---
## CI Integration

The suite can run in any CI pipeline that supports Node. Minimal example:

```yaml
# .github/workflows/playwright.yml
name: Playwright
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: cd tests/typescript && npm ci
      - run: cd tests/typescript && npx playwright install --with-deps
      - run: cd tests/typescript && npm test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: tests/typescript/playwright-report
```

---
## Extending the Suite

1. **Add new articles** – edit `src/data/wiki-articles.json` (`slug` must match the URL part after `/wiki/`).
2. **Add new structural checks** – extend `WikiPage` with new locators & helper methods, then update the relevant spec.

---
Happy testing! 💡 