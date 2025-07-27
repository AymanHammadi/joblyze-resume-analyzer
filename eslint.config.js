import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // Base ESLint recommended rules
  js.configs.recommended,
  
  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,
  
  {
    files: ['app/**/*.ts', 'app/**/*.tsx'], // Match your project structure
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.react-router/**',
      'public/**',
      '*.config.js',
      '*.config.ts'
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,
      
      // React Refresh rules (for development) - more lenient for routes and layouts
      'react-refresh/only-export-components': [
        'warn',
        { 
          allowConstantExport: true,
          allowExportNames: ['meta', 'loader', 'action', 'headers', 'links']
        },
      ],
      
      // General rules
      'no-unused-vars': 'off', // Turned off in favor of TypeScript version
      'no-console': 'off', // Allow console for debugging in development
      'prefer-const': 'warn',
      'no-var': 'error',
      
      // Import/Export rules
      'no-duplicate-imports': 'error',
    },
  },
  
  // Separate config for config files
  {
    files: ['*.config.js', '*.config.ts', 'vite.config.*'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': 'off',
    },
  },
];