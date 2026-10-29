import { defineConfig, devices } from '@playwright/test';
import { resolve } from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH ??= resolve('.local/browsers');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
export default defineConfig({
  testDir: './tests/e2e', fullyParallel: false, workers: 1, timeout: 60_000,
  expect: { timeout: 10_000 }, reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:5173', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [{ name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } }, { name: 'mobile-web', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } }],
  webServer: [
    { command: 'node --import tsx apps/api/src/main.ts', url: 'http://127.0.0.1:4100/health', env: { I2V_MODE: 'local', I2V_DATABASE: `.local/e2e-${Date.now()}.sqlite`, I2V_HOST: '127.0.0.1', I2V_PORT: '4100' }, timeout: 30_000, reuseExistingServer: false },
    { command: `${npm} run dev:web`, url: 'http://127.0.0.1:5173', timeout: 30_000, reuseExistingServer: false },
  ],
});
