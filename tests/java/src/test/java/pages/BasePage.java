package pages;

import com.microsoft.playwright.Page;

public abstract class BasePage {
    protected final Page page;

    protected BasePage(Page page) {
        this.page = page;
    }

    public void waitForPageLoad() {
        page.waitForLoadState();
    }

    public boolean isDisplayed() {
        return page.isVisible("body");
    }
} 