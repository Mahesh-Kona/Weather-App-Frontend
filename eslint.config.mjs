// eslint.config.js
const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname, // CommonJS already has __dirname
});

module.exports = [...compat.extends("next/core-web-vitals")];
