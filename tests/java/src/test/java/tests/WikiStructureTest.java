package tests;

import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import pages.WikiPage;

import static org.junit.jupiter.api.Assertions.*;

public class WikiStructureTest extends BaseTest {

    @ParameterizedTest(name = "Structural checks for /wiki/{0}")
    @MethodSource("util.ArticleProvider#slugArguments")
    void verifyStructure(String slug) {
        try (BrowserContext context = browser.newContext()) {
            Page page = context.newPage();
            WikiPage wiki = new WikiPage(page);
            page.navigate("https://en.wikipedia.org/wiki/" + slug);
            wiki.waitForPageLoad();

            assertFalse(wiki.getFirstParagraphText().isBlank(), "First paragraph should not be empty");
            assertTrue(wiki.hasTableOfContents(), "Table of Contents should exist");
            assertTrue(wiki.hasInfobox(), "Infobox should exist");
            assertTrue(wiki.hasReferencesSection(), "References section should exist");
        }
    }
} 