const search = () => {
	return {
		config: {
			extends: ["scriptlint/strict"],
			ignoreScripts: ["foobar"],
			rules: {
				"mandatory-dev": false
			}
		}
	};
};


const configs = {
	scriptlint: {
		search
	},
	missing: {
		search: () => null
	}
}

module.exports = {
	cosmiconfigSync: (name) => {
		return configs[name]
	}
};
