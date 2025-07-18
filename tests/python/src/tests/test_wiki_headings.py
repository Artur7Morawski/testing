import json
from pathlib import Path
import pytest
from pages.wiki_page import WikiPage

DATA_PATH = Path(__file__).parent.parent / "data" / "wiki_articles.json"

with DATA_PATH.open() as f:
    _ARTICLES = json.load(f)

@pytest.mark.parametrize("slug,title", [(a["slug"], a["title"]) for a in _ARTICLES])
def test_wikipedia_heading(page, slug: str, title: str):
    wiki_page = WikiPage(page)

    # Navigate and wait for load
    page.goto(f"https://en.wikipedia.org/wiki/{slug}")
    wiki_page.wait_for_page_load()

    # Verify heading matches expected title
    heading_text = wiki_page.get_heading_text()
    assert heading_text is not None
    assert heading_text.strip() == title

    # Verify browser title contains heading
    page_title = wiki_page.get_title()
    assert title in page_title 