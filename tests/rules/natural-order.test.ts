import rule, { sortScripts } from "../../src/rules/natural-order";

describe("natural-order.ts", () => {
	const scriptsUnsorted = {
		postbuild: "echo 1",
		build: "echo 1",
		"test:lint": "echo 1",
		"test:lint:scripts:es7": "echo 1",
		dev: "echo 1",
		posttest: "echo 1",
		"other:update:dependencies": "echo 1",
		preinstall: "echo 1",
		prebuild: "echo 1",
		"other:update": "echo 1",
		"other:update:typings": "echo 1",
		"test:lint:scripts": "echo 1",
		"test:lint:scripts:babel": "echo 1",
		"test:lint:styles:scss": "echo 1",
		publish: "echo 1",
		prepublishOnly: "echo 1",
		"build:cleanup": "echo 1",
		"test:lint:styles": "echo 1",
		test: "echo 1",
		start: "echo 1",
		pretest: "echo 1",
		"pretest:lint:scripts:es7": "echo 1",
		"test:lint:styles:postcss": "echo 1",
	};

	const scriptsSorted = {
		prebuild: "echo 1",
		build: "echo 1",
		"build:cleanup": "echo 1",
		postbuild: "echo 1",
		dev: "echo 1",
		preinstall: "echo 1",
		"other:update": "echo 1",
		"other:update:dependencies": "echo 1",
		"other:update:typings": "echo 1",
		publish: "echo 1",
		prepublishOnly: "echo 1",
		start: "echo 1",
		pretest: "echo 1",
		"pretest:lint:scripts:es7": "echo 1",
		test: "echo 1",
		"test:lint": "echo 1",
		"test:lint:scripts": "echo 1",
		"test:lint:scripts:babel": "echo 1",
		"test:lint:scripts:es7": "echo 1",
		"test:lint:styles": "echo 1",
		"test:lint:styles:postcss": "echo 1",
		"test:lint:styles:scss": "echo 1",
		posttest: "echo 1",
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
