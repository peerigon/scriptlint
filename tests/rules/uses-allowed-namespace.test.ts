import rule from "../../src/rules/uses-allowed-namespace";

describe("uses-allowed-namespace.ts", () => {
	it("should validate correctly", () => {
		expect(rule.validate("foo")).toBe(false);
		expect(rule.validate("other:foo")).toBe(true);
		expect(rule.validate("script:cms")).toBe(true);
		expect(rule.validate("preFoo")).toBe(false);
		expect(rule.validate("postFoo")).toBe(false);
		expect(rule.validate("preother:foo")).toBe(true);
		expect(rule.validate("postother:foo")).toBe(true);
	});
});
