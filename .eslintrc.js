module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    '@typescript-eslint/tslint',
    'css-modules'
  ],
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2019,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/tslint/config": ["error", { lintFile: "./tslint.json" }],
        "css-modules/no-unused-class": ['error', {}],
        "css-modules/no-undef-class": ['error', {}]
      }
    }
  ]
};
