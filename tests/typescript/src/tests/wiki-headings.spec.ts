import { test, expect } from '@playwright/test'
import { WikiPage } from '@pages/wiki.page'
import articles from '../data/wiki-articles.json' assert { type: 'json' }

// Scenario: SC-WIKI-HEAD-001 – Generic Wikipedia article heading verification using JSON data

interface ArticleData {
  slug: string;
  title: string;
}

const articleData: ArticleData[] = articles as ArticleData[]

test.describe('SC-WIKI-HEAD-001: Wikipedia Article Headings', () => {
  for (const { slug, title } of articleData) {
    test(`Heading matches article name for /wiki/${slug}`, async ({ page }) => {
      const wikiPage = new WikiPage(page)

      await test.step(`Navigate to ${slug} Wikipedia page`, async () => {
        await page.goto(`/wiki/${slug}`)
        await wikiPage.waitForPageLoad()
      })

      await test.step('Verify heading text equals expected', async () => {
        const headingText = await wikiPage.getHeadingText()
        expect(headingText).not.toBeNull()
        expect((headingText as string).trim()).toBe(title)
      })

      await test.step('Verify browser title contains heading', async () => {
        const pageTitle = await wikiPage.getTitle()
        expect(pageTitle).toContain(title)
      })
    })
  }
}) 