/** @type {import('prettier').Config} */
const config = {
  trailingComma: "all",
  semi: true,
  bracketSpacing: true,
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-organize-imports"],
};

export default config;
