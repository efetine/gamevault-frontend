/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  bracketSpacing: true,
  arrowParens: 'always',
  jsxSingleQuote: true,
  jsxBracketSameLine: false,
  tabWidth: 2,
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-organize-imports'],
};

export default config;
