const path = require("path");

const fs = jest.genMockFromModule("fs");

const packageFile = {
	scripts: {
		foo: "bar"
	}
};

const mockFiles = {
	"real/existing/path/package.json": JSON.stringify(
		{ ...packageFile },
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

fs.readFileSync = readFileSync;
fs.writeFileSync = writeFileSync;

module.exports = fs;
