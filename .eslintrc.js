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
    "import/no-anonymous-default-export": "off",
    "import/prefer-default-export": "warn",
    indent: ["error", "tab"],
    "@typescript-eslint/indent": "off",
    "no-tabs": "off",
    "@typescript-eslint/strict-boolean-expressions": "off"
  }
};
