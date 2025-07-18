import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './src',
  timeout: 30_000,
  retries: 3,
  workers: 4,
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
    viewport: { width: 1280, height: 720 },
    baseURL: 'https://en.wikipedia.org'
  },
  projects: [
    {
      name: 'original',
      testMatch: '**/*.spec.ts',
    },
    {
      name: 'rewritten',
      testMatch: '**/*.spec.ts',
    }
  ]
}

export default config 