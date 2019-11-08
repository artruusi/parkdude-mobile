module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'eslint:recommended', 'plugin:react/recommended', 'google'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    jsx: true
  },
  env: {
    jest: true,
    node: true
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  globals: {
    fetch: false
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    // Doesn't play nice with component style definitions
    '@typescript-eslint/no-use-before-define': 'off',
    'comma-dangle': 'off',
    'max-len': ['error', { code: 120 }],
    'new-cap': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    indent: ['error', 2]
  }
};
