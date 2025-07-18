# Wikipedia Playwright Test Suite (Python)

A Python port of the TypeScript Playwright test suite located in `tests/typescript`.  It uses **pytest** together with the official `pytest-playwright` plugin.

## Quick start

```bash
cd tests/python
# 1) Create & activate a virtual-env with python3 (macOS ships only python3)
python3 -m venv .venv
source .venv/bin/activate

# 2) Install dependencies (and optionally upgrade pip)
python -m pip install --upgrade pip        # optional but recommended
python -m pip install -r requirements.txt

# 3) Download Playwright browser binaries (once per machine)
python -m playwright install

# 4) Run the tests (executed in parallel via pytest-xdist)
pytest                # -n 4 -v is added automatically via pytest.ini
```

### Docker

Run the suite in an isolated container (no local Python/Playwright installation needed):

```bash
cd tests/python
./test-docker.sh             # builds the image + executes tests
./test-docker.sh -k heading  # forward extra pytest args
```

The script uses the provided `Dockerfile` and BuildKit cache layers for pip packages and browser binaries, so subsequent builds are much faster.

## Structure

```
 tests/python/
 │
 ├── src/
 │   ├── data/                 # JSON driven test data
 │   ├── pages/                # Page-object classes (BasePage, WikiPage)
 │   ├── config/               # TIMEOUTS constants
 │   └── tests/                # pytest specs
 │
 ├── requirements.txt          # runtime dependencies
 └── README.md                 # this file
```

## Notes

* Tests mirror the checks implemented in the TypeScript version: heading validation and structural verification for the same set of Wikipedia articles.
* The suite uses synchronous Playwright API for simplicity – no `async` / `await` keywords required.
* `conftest.py` ensures `src/` is on `PYTHONPATH` so the imports inside tests resolve correctly. 
* By default the suite runs on **4 parallel workers** (configured in `pytest.ini`). To change workers pass `-n <num>` on the command line. 