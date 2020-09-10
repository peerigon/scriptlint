import rule, { sortScripts } from "../../src/rules/alphabetic-order";

describe("alphabetic-order.ts", () => {
	const invalidScripts = {
		foo: "bar",
		aba: "cus",
	};

	describe("validate()", () => {
		it("should validate correctly", () => {
			expect(rule.validate({})).toBe(true);
			expect(rule.validate(invalidScripts)).toBe(false);
		});
	});

	it("should fix issues", () => {
		expect(rule.validate(rule.fix(invalidScripts))).toBe(true);
	});

	describe("sortScripts()", () => {
		it("should sort correctly", () => {
			expect(sortScripts({})).toEqual({});
			expect(
				Object.keys(
					sortScripts({
						x: "-1",
						a: "1",
						0: "2",
						b: "0",
					})
				)
			).toEqual(["0", "a", "b", "x"]);
		});
	});
});
