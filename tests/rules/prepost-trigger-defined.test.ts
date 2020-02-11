import rule from "../../src/rules/prepost-trigger-defined";

describe("prepost-trigger-defined.ts", () => {
	it("should validate correctly", () => {
		expect(rule.validate({})).toBe(true);
		expect(
			rule.validate({
				prefoo: "echo 1",
				foo: "echo 1",
			})
		).toBe(true);

		expect(
			rule.validate({
				prefoo: "echo 1",
			})
		).toEqual(["prefoo"]);

		expect(
			rule.validate({
				postfoo: "echo 1",
			})
		).toEqual(["postfoo"]);
	});
});
