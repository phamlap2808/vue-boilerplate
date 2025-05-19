import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'no-console': 'off',
      'import/no-duplicates': ['warn',
        {
          'prefer-inline': true,
        },
      ],
      'import/first': 'warn',
      'import/order': 'off',
      'sort-imports': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/no-unused-vars': ['warn', {
        ignorePattern: '^_',
      }],
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-empty-object-type': ['warn', {
        allowInterfaces: 'always',
      }],
      '@typescript-eslint/consistent-type-imports': ['warn', {
        fixStyle: 'inline-type-imports',
      }],
      'no-restricted-imports': ['error', {
        paths: [
          {
            name: 'lodash',
            message: 'Please use remeda instead of lodash',
          },
        ],
      }],
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
    settings: {
      tailwindcss: {
        callees: ['cn'],
        whitelist: [
          // from element-plus
          '^is-current',
        ],
      },
    },
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  ...pluginOxlint.configs['flat/recommended'],
)
