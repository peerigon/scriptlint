/* eslint-disable import/unambiguous */
/* eslint-disable @typescript-eslint/no-var-requires */

// We require from the build here to test if the build exports correctly!
const scriptlint = require("../dist/index");

describe("scriptlint module export", () => {
	it("should export a function", () => {
		expect(typeof scriptlint).toBe("function");
	});

	it("should throw with too much config", () => {
		expect(() => {
			scriptlint({
				packageFile: "foo/bar/baz",
				packageScripts: {
					foo: "bar",
				},
			});
		}).toThrowError(/not both/);
	});

	it("should throw with too little config", () => {
		expect(() => {
			scriptlint({});
		}).toThrowError(/location or a scripts/);
	});

	it("should lint correctly", () => {
		expect(
			scriptlint({
				strict: true,
				packageScripts: {},
			}).length
		).toBe(3);
	});
});
