import { Page } from '@playwright/test'

export class BasePage {
  protected readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  // Wait for generic page load; subclasses should override for specific conditions
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState()
  }

  // Basic visibility check; subclasses can override
  async isDisplayed(): Promise<boolean> {
    return this.page.isVisible('body')
  }
} 