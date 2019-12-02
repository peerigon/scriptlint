import {loadRulesFromRuleConfig} from "./rules";
import defaultRules from "./defaultRules";
import {PROJECT_NAME} from "./constants";

describe("rules.ts", () => {
	it("loads correct amount of rules", () => {
		const loadedRules = loadRulesFromRuleConfig([PROJECT_NAME + "/strict"]);

		expect(loadedRules.length).toBe(defaultRules.length);
	});
});
