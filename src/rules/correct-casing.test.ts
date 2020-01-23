import rule from "./correct-casing";

describe("correct-casing.ts", () => {
	it("should validate correctly", () => {
		expect(rule.validate("foobar")).toBe(true);
		expect(rule.validate("fooBar")).toBe(true);
		expect(rule.validate("foo:bar")).toBe(true);
		expect(rule.validate("foo-bar")).toBe(false);
		expect(rule.validate("foo_bar")).toBe(false);
	});
});
