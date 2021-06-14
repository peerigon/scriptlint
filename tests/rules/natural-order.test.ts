import rule, { sortScripts } from "../../src/rules/natural-order";

describe("natural-order.ts", () => {
	const scriptsUnsorted = {
		postbuild: "foo",
		"test:lint": "baz",
		"build:cleanup": "bar",
		"update:typings": "something",
		test: "jest",
		posttest: "baz",
		pretest: "baz",
		update: "foo",
		"update:dependencies": "updtr",
		prebuild: "foo",
		build: "foo",
		publish: "ok",
		prepublishOnly: "else",
	};

	const scriptsSorted = {
		prebuild: "foo",
		build: "foo",
		"build:cleanup": "bar",
		postbuild: "foo",
		publish: "ok",
		prepublishOnly: "else",
		pretest: "baz",
		test: "jest",
		"test:lint": "baz",
		posttest: "baz",
		update: "foo",
		"update:dependencies": "updtr",
		"update:typings": "something",
	};

	describe("validate()", () => {
		it("should validate correctly", () => {
			expect(rule.validate({})).toBe(true);
			expect(rule.validate(scriptsUnsorted)).toBe(false);
			expect(rule.validate(scriptsSorted)).toBe(true);
		});
	});

	it("should fix issues", () => {
		expect(rule.validate(rule.fix(scriptsUnsorted))).toBe(true);
	});

	describe("sortScripts()", () => {
		it("should sort correctly", () => {
			expect(sortScripts({})).toEqual({});
			expect(Object.keys(sortScripts(scriptsUnsorted))).toEqual(
				Object.keys(scriptsSorted)
			);
		});
	});
});
