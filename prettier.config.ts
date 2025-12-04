import { type Config } from 'prettier';

const config: Config = {
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-css-order'],
};

export default config;
