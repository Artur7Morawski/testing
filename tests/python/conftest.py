import sys
from pathlib import Path

# Ensure `tests/python/src` is on PYTHONPATH so imports like `from pages...` work
ROOT = Path(__file__).resolve().parent / "src"
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT)) 