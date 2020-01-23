import rule from "./uses-allowed-namespace";

describe("uses-allowed-namespace.ts", () => {
	it("should validate correctly", () => {
		expect(rule.validate("foo")).toBe(false);
		expect(rule.validate("other:foo")).toBe(true);
		expect(rule.validate("preFoo")).toBe(true);
		expect(rule.validate("postFoo")).toBe(true);
	});
});
