class BasePage:
    """Generic base page with helper methods"""

    def __init__(self, page):
        self.page = page

    def wait_for_page_load(self):
        """Wait for the network to be idle. Override in subclasses if necessary."""
        self.page.wait_for_load_state("load")

    def is_displayed(self) -> bool:
        return self.page.is_visible("body") 