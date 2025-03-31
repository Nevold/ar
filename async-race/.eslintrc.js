module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'prettier',
    'plugin:unicorn/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    projectService: true,
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest',
    createDefaultProgram: true,
    ecmaFeatures: {
      impliedStrict: true
    }
  },
  plugins: ['@typescript-eslint', 'prettier', 'import', 'unicorn'],
  ignorePatterns: ['.eslintrc.js', 'webpack.config.js', 'index.html', 'declarations.d.ts', 'commitlint.config.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': ['error'],
    'func-names': 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': 'warn',
    'no-console': 'warn',
    'max-len': ['warn', { code: 120 }],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/lines-between-class-members': 'warn',
    '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'explicit', overrides: { constructors: 'off' } }
    ],
    '@typescript-eslint/member-ordering': 'error',
    'class-methods-use-this': 'error',
    'unicorn/no-array-for-each': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    'unicorn/no-for-loop': 'off',
    'no-param-reassign': 'off'
  },
  noInlineConfig: true,
  reportUnusedDisableDirectives: true
};
