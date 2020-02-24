module.exports = {
  extends: [
    "peerigon",
    "peerigon/node",
    "peerigon/typescript",
    "peerigon/styles/prefer-arrow",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  env: {
    node: true,
    jest: true
  },
  root: true,
  rules: {
    "no-console": "warn",
    "import/no-anonymous-default-export": "off",
    indent: ["error", "tab"],
    "@typescript-eslint/indent": "off",
    "no-tabs": "off",
    "babel/object-curly-spacing": "off"
  },
  parserOptions: {
    project: `./tsconfig.json`
  }
};
