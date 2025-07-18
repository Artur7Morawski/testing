from __future__ import annotations
from .base_page import BasePage
from config.timeouts import TIMEOUTS


class WikiPage(BasePage):
    def __init__(self, page):
        super().__init__(page)
        # Locators
        self.heading = page.locator("#firstHeading")
        # Table of Contents exists in two flavours depending on skin
        self.toc = page.locator("#toc, #vector-toc")
        # All paragraph elements inside article content; we'll pick the first with text at runtime
        self.paragraphs = page.locator("#mw-content-text p")
        self.infobox = page.locator("table.infobox")
        self.references_heading = page.locator("#References")

    def wait_for_page_load(self):
        """Wait until the article heading is attached (visible on most skins)."""
        self.heading.wait_for(state="attached", timeout=TIMEOUTS.MEDIUM)

    def get_heading_text(self) -> str | None:
        return self.heading.text_content()

    def get_title(self) -> str:
        return self.page.title()

    def get_first_paragraph_text(self) -> str:
        """Return the text of the first non-empty paragraph.

        We wait for the element *to be attached* rather than visible because on
        some Wikipedia skins the paragraph might be outside the viewport at
        first. Using `inner_text()` avoids `None` values returned by
        `text_content()` when the node is detached during reflow.
        """
        # Wait until at least one <p> exists inside #mw-content-text
        self.paragraphs.first.wait_for(state="attached", timeout=TIMEOUTS.MEDIUM)

        # Iterate through paragraphs and return the first non-empty text
        for text in self.paragraphs.all_inner_texts():
            cleaned = text.strip()
            if cleaned:
                return cleaned

        return ""

    def has_table_of_contents(self) -> bool:
        return self.toc.count() > 0

    def has_infobox(self) -> bool:
        return self.infobox.count() > 0

    def has_references_section(self) -> bool:
        return self.references_heading.count() > 0 