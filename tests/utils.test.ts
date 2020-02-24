import {
	slugify,
	filterPackageScriptsByKeys,
	makeMessage,
	makePackageFilePath,
	patchScriptObjectEntry
} from "../src/utils";

jest.mock("fs");
jest.mock("path");

describe("patchScriptObjectEntry()", () => {
	expect(
		patchScriptObjectEntry(
			{
				bar: "1",
				foo: "2"
			},
			"bar",
			"xxx",
			"5"
		)
	).toEqual({
		xxx: "5",
		foo: "2"
	});
});

describe("slugify()", () => {
	it("should leave empty strings alone", () => {
		expect(slugify("")).toEqual("");
	});

	it("should already slugged strings alone", () => {
		expect(slugify("this-is-fine")).toEqual("this-is-fine");
	});

	it("should lowercase some stuff", () => {
		expect(slugify("LOWERCASE-THIS")).toEqual("lowercase-this");
	});

	it("should sluggify correctly 1", () => {
		expect(slugify("this is NOT cool! ")).toEqual("this-is-not-cool");
	});

	it("should sluggify correctly 2", () => {
		expect(slugify("!APPARENTLY\tSOMETHING WENT 🚨 WRONG!")).toEqual(
			"apparently-something-went-wrong"
		);
	});

	it("should sluggify correctly 3", () => {
		expect(slugify("rm -rf")).toEqual("rm-rf");
	});

	it("should sluggify correctly 4", () => {
		expect(slugify("unix-operators (&)")).toEqual("unix-operators");
	});
});

describe("filterPackageScriptsByKeys()", () => {
	it("filters objects by keys correctly", () => {
		expect(
			filterPackageScriptsByKeys(
				{ foo: "echo 1", bar: "echo 2", baz: "echo 3" },
				["bar"]
			)
		).toEqual({
			baz: "echo 3",
			foo: "echo 1"
		});
		expect(filterPackageScriptsByKeys({ foo: "echo 1" }, [])).toEqual({
			foo: "echo 1"
		});
		expect(filterPackageScriptsByKeys({}, [])).toEqual({});
	});
});

describe("makePackageFilePath()", () => {
	it("throws on file not found", () => {
		expect(() => {
			makePackageFilePath("foo/bar/baz");
		}).toThrowError(/such package.json found/);
	});

	it("works with package.json", () => {
		const path = makePackageFilePath("real/existing/path/package.json");

		expect(path).toEqual("real/existing/path/package.json");
	});

	it("works without package.json", () => {
		const path = makePackageFilePath("real/existing/path");

		expect(path).toEqual("real/existing/path/package.json");
	});
});

describe("makeMessage()", () => {
	it("compiles correctly", () => {
		expect(makeMessage("foo {{bar}}", { bar: "test" })).toEqual("foo test");
	});
});
