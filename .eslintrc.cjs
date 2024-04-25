module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'jest.config.js'],
    parserOptions: { ecmaVersion: 2018, sourceType: 'module' },
    rules: { '@typescript-eslint/no-var-requires': 'off' },
};
