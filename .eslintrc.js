module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
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
    '@typescript-eslint/indent': ['error', 2],
    'no-tabs': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    // '@typescript-eslint/explicit-function-return-type': ['error', {
    //   allowExpressions: true,
    // }],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'no-param-reassign': 'off',

  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['.eslintrc.js'],
      parserOptions: {
        project: null,
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
