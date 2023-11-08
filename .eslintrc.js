module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json', // path to your tsconfig.json
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // Add custom rules here
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'react/prop-types': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/jsx-no-bind': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'react/function-component-definition': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  overrides: [
    {
      files: ['.eslintrc.js'], // exclude this config file from typescript parsing
      parserOptions: {
        project: null, // don't use any tsconfig for this file
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
