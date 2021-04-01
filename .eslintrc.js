module.exports = {
	extends: ["peerigon/presets/prettier-typescript-node.js"],
	// env: {
	// 	node: true,
	// 	jest: true,
	// },
	root: true,
	rules: {
		"no-console": "warn",
		"import/no-anonymous-default-export": "off",
		indent: ["error", "tab"],
		"@typescript-eslint/indent": "off",
		"no-tabs": "off",
		"babel/object-curly-spacing": "off",
		"prefer-arrow/prefer-arrow-functions": "off",
		"node/no-unsupported-features/es-syntax": "off",
		"node/no-missing-import": "off",
	},
	parserOptions: {
		project: "./tsconfig.json",
		sourceType: "module",
	},
};
