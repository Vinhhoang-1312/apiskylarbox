module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        'alphabetize': { 'order': 'asc', 'caseInsensitive': true },
        'pathGroups': [
          {
            pattern: '@nestjs/**',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@modules/**',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@shared/**',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@common/**',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@config/**',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@utils/**',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@constants/**',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@guards/**',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@libs/**',
            group: 'internal',
            position: 'after'
          }
        ],
        'pathGroupsExcludedImportTypes': ['builtin']
      }
    ]
  },
};
