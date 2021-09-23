module.exports = {
	extends: ["peerigon/presets/prettier-typescript-node.js"],
	root: true,
	rules: {
		"no-console": "warn",
		"import/no-anonymous-default-export": "off",
		"node/no-unsupported-features/es-syntax": "off",
		"node/no-missing-import": "off",
	},
	parserOptions: {
		project: "./tsconfig.json",
		sourceType: "module",
	},
};
