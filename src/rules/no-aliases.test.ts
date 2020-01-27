import rule from "./no-aliases";

describe("no-aliases.ts", () => {
	it("should validate correctly", () => {
		expect(rule.validate("foo", "bar")).toBe(true);
		expect(rule.validate("release", "release")).toBe(true);
		expect(rule.validate("bar", "bar")).toBe(false);
	});
});
