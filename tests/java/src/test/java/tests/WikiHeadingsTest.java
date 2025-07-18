package tests;

import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import pages.WikiPage;

import static org.junit.jupiter.api.Assertions.*;

public class WikiHeadingsTest extends BaseTest {

    @ParameterizedTest(name = "Heading matches title for /wiki/{0}")
    @MethodSource("util.ArticleProvider#articleArguments")
    void headingMatchesTitle(String slug, String title) {
        try (BrowserContext context = browser.newContext()) {
            Page page = context.newPage();
            WikiPage wiki = new WikiPage(page);
            page.navigate("https://en.wikipedia.org/wiki/" + slug);
            wiki.waitForPageLoad();

            String headingText = wiki.getHeadingText();
            assertNotNull(headingText);
            assertEquals(title, headingText.trim());

            assertTrue(wiki.getTitle().contains(title));
        }
    }
} 