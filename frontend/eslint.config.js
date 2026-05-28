/**
 * @module eslint.config
 * @description ESLint with TypeScript strict + jsx-a11y accessibility linting.
 * Accessibility violations caught here in CI — not just at runtime.
 */
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import a11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'jsx-a11y': a11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...a11y.configs.recommended.rules,

      // Enforce explicit return types on exported functions
      '@typescript-eslint/explicit-function-return-type': 'warn',

      // No any — ever
      '@typescript-eslint/no-explicit-any': 'error',

      // Catch potential null pointer errors
      '@typescript-eslint/no-non-null-assertion': 'error',

      // Accessibility: buttons must have accessible labels
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
    },
  }
);
