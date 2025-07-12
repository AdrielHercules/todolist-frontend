/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 80,
  semi: true,
  tabWidth: 2,
  useTabs: false,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/styles.css",
};
