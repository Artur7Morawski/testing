import { BasePage } from '@pages/base.page'

export class WikiPage extends BasePage {
  readonly heading = this.page.locator('#firstHeading')

  // Table of Contents in legacy or new vector skin
  readonly toc = this.page.locator('#toc, #vector-toc')

  // Select first non-empty paragraph inside article content
  readonly firstParagraph = this.page
    .locator('#mw-content-text p', { hasText: /\S/ })
    .first()

  readonly infobox = this.page.locator('table.infobox')

  readonly referencesHeading = this.page.locator('#References')

  async waitForPageLoad(): Promise<void> {
    await this.heading.waitFor()
  }

  async getHeadingText(): Promise<string | null> {
    return this.heading.textContent()
  }

  // Additional example method: validate page title matches heading (no assertions)
  async getTitle(): Promise<string> {
    return this.page.title()
  }

  async getFirstParagraphText(): Promise<string> {
    return (await this.firstParagraph.textContent()) ?? ''
  }

  async hasTableOfContents(): Promise<boolean> {
    return (await this.toc.count()) > 0
  }

  async hasInfobox(): Promise<boolean> {
    return (await this.infobox.count()) > 0
  }

  async hasReferencesSection(): Promise<boolean> {
    return (await this.referencesHeading.count()) > 0
  }
} 