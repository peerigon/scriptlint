const search = () => {
	return {
		config: {
			strict: true,
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
};

module.exports = {
	cosmiconfigSync: name => {
		return configs[name];
	}
};
