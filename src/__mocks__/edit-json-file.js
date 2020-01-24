const demoJson = {
	name: "scriptlint-dependant",
	version: "1.0.0",
	description: "",
	main: "index.js",
	scripts: {
		dev: "echo 1",
		test: 'secho "Error: no test specified" && exit 1',
		"format:eslint": "eslint",
		"other-foo-lol": "echo haha",
		start: 'secho "Error: no test specified" && exit 1',
		"test:lint:scripts": "scriptlint"
	},
	keywords: [],
	author: "",
	license: "ISC",
	dependencies: {
		"change-case": "^4.1.1"
	}
};
module.exports = () => ({
	get: () => { return demoJson },
	set: () => { return "written" }
});