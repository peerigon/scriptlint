import defaultRules from "./defaultRules";
import defaultRuleSets from "./defaultRuleSets";

describe("defaultRuleSets.ts", () => {
	it("should sanitize configs", () => {
		expect(defaultRuleSets.strict.length).toEqual(defaultRules.length);
	});
});

export {};
