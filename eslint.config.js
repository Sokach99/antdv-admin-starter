// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  vueJsx: true,
  typescript: true,
  ignores: [
    'node_modules',
    'dist',
    'build',
    'public',
    'tsconfig.json',
    'tsconfig.*.json',
    'package.json',
  ],
  prettier: true,
  prettierOptions: {
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    printWidth: 120,
    tabWidth: 2,
    useTabs: false,
    endOfLine: 'lf',
    parser: 'babel',
    singleAttributePerLine: false,
    embeddedLanguageFormatting: 'auto',
  },
}, {
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'no-prototype-builtins': 'off',
    'no-sequences': 'off',
    'no-extra-parens': 'off',
    'sort-keys': 'off',
    'ts/type-ban': 'off',
  },
})
