// eslint.config.js
import unusedImports from 'eslint-plugin-unused-imports';
import playwright from 'eslint-plugin-playwright';
import * as parser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import noRedundantWaitForVisible from './tools/eslint-rules/no-redundant-waitfor-visible.js';
import noUnreliablePlaywrightFunctions from './tools/eslint-rules/no-unreliable-playwright-functions.js';

const config = [
  // TypeScript Configuration
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-extraneous-class': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      'no-empty-function': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'off', // handled by unused-imports
    }
  },
  // Unused Imports
  {
    plugins: { 'unused-imports': unusedImports },
    rules: {
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
    }
  },
  // Playwright plugin
  {
    files: ['**/*.spec.ts', '**/tests/**/*.ts'],
    plugins: { playwright },
    rules: {
      'playwright/expect-expect': 'error',
      'playwright/no-conditional-in-test': 'error',
      'playwright/no-element-handle': 'error',
      'playwright/no-eval': 'error',
      'playwright/no-focused-test': 'error',
      'playwright/no-force-option': 'warn',
      'playwright/no-page-pause': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/no-wait-for-timeout': 'error',
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/valid-expect': 'error',
    }
  },
  // Import patterns (TypeScript files only)
  {
    files: ['**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['./pages/*', './utils/*', './mocks/*', './tools/*'],
              message: 'Use path aliases (@pages, @utils, @mocks, @tools) instead of deep relative imports'
            },
            {
              group: ['*.js', '*.ts'],
              message: 'Remove file extensions from imports when using path aliases'
            }
          ]
        }
      ]
    }
  },
  // Custom rules
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts'],
    plugins: {
      custom: {
        rules: {
          'no-redundant-waitfor-visible': noRedundantWaitForVisible,
          'no-unreliable-playwright-functions': noUnreliablePlaywrightFunctions
        }
      }
    },
    rules: {
      'custom/no-redundant-waitfor-visible': 'error',
      'custom/no-unreliable-playwright-functions': 'error'
    }
  }
];

export default config; 