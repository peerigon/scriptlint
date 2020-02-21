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
			}).issues.length
		).toBe(3);
	});

	it("should lint correctly", () => {
		expect(
			scriptlint({
				strict: false,
				packageScripts: {
					dev: "echo 1",
					test: "echo 1",
					start: "echo 1",
				},
			}).issues.length
		).toBe(0);
	});

	it("should fix correctly", () => {
		expect(
			Object.keys(
				scriptlint({
					fix: true,
					strict: true,
					packageScripts: {
						start: "echo 1",
						test: "echo 1",
						dev: "echo 1",
						foo: "bar",
					},
				}).scripts
			)
		).toEqual(["dev", "other:foo", "start", "test"]);
	});
});
