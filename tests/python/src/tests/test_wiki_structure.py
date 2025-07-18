import json
from pathlib import Path
import pytest
from pages.wiki_page import WikiPage
from config.timeouts import TIMEOUTS

DATA_PATH = Path(__file__).parent.parent / "data" / "wiki_articles.json"

with DATA_PATH.open() as f:
    _ARTICLES = json.load(f)

@pytest.mark.parametrize("slug", [a["slug"] for a in _ARTICLES])
def test_wikipedia_structure(page, slug: str):
    wiki_page = WikiPage(page)
    page.goto(f"https://en.wikipedia.org/wiki/{slug}")
    wiki_page.wait_for_page_load()

    # Verify first paragraph is present and not empty
    para_text = wiki_page.get_first_paragraph_text()
    assert para_text.strip(), "First paragraph should not be empty"

    # Verify Table of Contents visible
    assert wiki_page.toc.is_visible(timeout=TIMEOUTS.MEDIUM), "TOC should be visible"

    # Verify Infobox visible (at least first)
    assert wiki_page.infobox.first.is_visible(timeout=TIMEOUTS.MEDIUM), "Infobox should be visible"

    # Verify References section exists
    assert wiki_page.has_references_section(), "References section should exist" 