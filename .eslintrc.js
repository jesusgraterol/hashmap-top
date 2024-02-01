module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['*.test-unit.js', '*.test-integration.js', '*.test-e2e.js'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-multiple-empty-lines': ['error', { max: 5, maxEOF: 0 }],
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
  },
};
