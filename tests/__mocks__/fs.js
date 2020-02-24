const path = require("path");

const fs = jest.genMockFromModule("fs");

const packageFile = {
	scripts: {
		foo: "bar"
	}
};

const packageFileFixable = {
	scripts: {
		"start": "echo 1",
		"test": "echo 1",
		"dev": "echo 1",
	}
};

const packageFileFixable2 = {
	scripts: {
		"start": "echo 1",
		"foo": "echo 1",
		"test": "echo 1",
		"dev": "echo 1",
	}
};

const packageFileCorrect = {
	scripts: {
		"dev": "echo 1",
		"other:foo": "echo 1",
		"start": "echo 1",
		"test": "echo 1",
	}
};

const mockFiles = {
	"real/existing/path/package.json": JSON.stringify(
		{ ...packageFile },
		null,
		2
	),
	"real/existing/path/correct/package.json": JSON.stringify(
		{ ...packageFileCorrect },
		null,
		2
	),
	"real/existing/path/fixable/package.json": JSON.stringify(
		{ ...packageFileFixable },
		null,
		2
	),
	"real/existing/path/fixable2/package.json": JSON.stringify(
		{ ...packageFileFixable2 },
		null,
		2
	),
	"real/existing/path/package-without-scripts.json": JSON.stringify(
		{},
		null,
		2
	),
	"real/existing/path/package-with-tabs.json": JSON.stringify(
		{ ...packageFile },
		null,
		"\t"
	)
};

function readFileSync(directoryPath) {
	return mockFiles[directoryPath];
}

function writeFileSync(path, content) {
	return {
		written: true,
		path,
		content
	};
}

function existsSync(directoryPath) {
	return Object.keys(mockFiles).includes(directoryPath);
}

fs.readFileSync = readFileSync;
fs.writeFileSync = writeFileSync;
fs.existsSync = existsSync;

module.exports = fs;
