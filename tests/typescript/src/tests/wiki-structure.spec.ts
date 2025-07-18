import { test, expect } from '@playwright/test'
import { WikiPage } from '@pages/wiki.page'
import articles from '../data/wiki-articles.json' assert { type: 'json' }

interface ArticleData {
  slug: string;
  title: string;
}

const articleData: ArticleData[] = articles as ArticleData[]

// Scenario: SC-WIKI-STRUCT-001 – Verify basic structural elements on Wikipedia articles

test.describe('SC-WIKI-STRUCT-001: Wikipedia Article Structure', () => {
  for (const { slug } of articleData) {
    test(`Structural checks for /wiki/${slug}`, async ({ page }) => {
      const wikiPage = new WikiPage(page)
      await test.step(`Navigate to ${slug}`, async () => {
        await page.goto(`/wiki/${slug}`)
        await wikiPage.waitForPageLoad()
      })

      await test.step('Verify first paragraph is present and non-empty', async () => {
        const paraText = await wikiPage.getFirstParagraphText()
        expect(paraText.trim().length).toBeGreaterThan(0)
      })

      await test.step('Verify Table of Contents is visible', async () => {
        await expect(wikiPage.toc).toBeVisible({ timeout: 10000 })
      })

      await test.step('Verify Infobox is visible', async () => {
        await expect(wikiPage.infobox.first()).toBeVisible({ timeout: 10000 })
      })

      await test.step('Verify References section exists', async () => {
        expect(await wikiPage.hasReferencesSection()).toBeTruthy()
      })
    })
  }
}) 