module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', "node_modules/", "out/", "public/", "tailwind.config.js"],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier', 'tailwindcss', 'unused-imports'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 'error',
    'semi': ['error', 'never'],
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true,
        plugins: [
          'prettier-plugin-tailwindcss',
          '@ianvs/prettier-plugin-sort-imports'
        ]
      }
    ]
  },
  settings: {
    tailwindcss: {
      callees: ['cn'],
      config: './tailwind.config.js'
    }
  },
  
}
