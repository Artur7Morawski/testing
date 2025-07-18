package pages;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.WaitForSelectorState;
import config.Timeouts;

public class WikiPage extends BasePage {
    private final Locator heading;
    private final Locator toc;
    private final Locator paragraphs;
    private final Locator infobox;
    private final Locator referencesHeading;

    public WikiPage(Page page) {
        super(page);
        this.heading = page.locator("#firstHeading");
        this.toc = page.locator("#toc, #vector-toc");
        this.paragraphs = page.locator("#mw-content-text p");
        this.infobox = page.locator("table.infobox");
        this.referencesHeading = page.locator("#References");
    }

    @Override
    public void waitForPageLoad() {
        heading.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.ATTACHED).setTimeout((double) Timeouts.MEDIUM));
    }

    public String getHeadingText() {
        return heading.textContent();
    }

    public String getTitle() {
        return page.title();
    }

    public String getFirstParagraphText() {
        paragraphs.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.ATTACHED).setTimeout((double) Timeouts.MEDIUM));
        for (String text : paragraphs.allInnerTexts()) {
            String cleaned = text.trim();
            if (!cleaned.isEmpty()) {
                return cleaned;
            }
        }
        return "";
    }

    public boolean hasTableOfContents() {
        return toc.count() > 0;
    }

    public boolean hasInfobox() {
        return infobox.count() > 0;
    }

    public boolean hasReferencesSection() {
        return referencesHeading.count() > 0;
    }
} 