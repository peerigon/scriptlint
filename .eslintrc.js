module.exports = {
  extends: [
    "peerigon",
    "peerigon/node",
    "peerigon/typescript",
    "peerigon/styles/prefer-arrow"
  ],
  env: {
    node: true,
    jest: true
  },
  root: true,
  rules: {
    indent: ["error", "tab"],
    "@typescript-eslint/indent": ["error", "tab"],
    "no-tabs": 0,
    "@typescript-eslint/strict-boolean-expressions": 0
  }
};
