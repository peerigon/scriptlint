import {loadRulesFromRuleConfig, getRuleByName} from "./rules";
import defaultRules from "./defaultRules";

describe("rules.ts", () => {
	const defaultRulesLoaded = loadRulesFromRuleConfig(false);
	const strictRulesLoaded = loadRulesFromRuleConfig(true);

	it("loads custom rules", () => {
		const customRule = {
			name: "test-custom-rule-foobar",
			isObjectRule: false,
			message: "foobar",
			validate: () => true,
		};

		const rulesWithCustomRule = loadRulesFromRuleConfig(
			false,
			{
				[customRule.name]: true,
			},
			[customRule]
		);

		expect(
			rulesWithCustomRule
				.map(r => r.name)
				.filter(r => r === customRule.name)[0]
		).toBe(customRule.name);
	});

	it("loads correct amount of rules", () => {
		expect(strictRulesLoaded.length).toBe(defaultRules.length);
	});

	test("getRuleByName() nulls on unknown name", () => {
		expect(getRuleByName(defaultRulesLoaded, "foo")).toBe(null);
		expect(
			getRuleByName(defaultRulesLoaded, "mandatory-dev")
		).toMatchSnapshot();
	});

	test("loadRulesFromSet() excludes rules by config", () => {
		const rules = loadRulesFromRuleConfig(true, {
			"mandatory-dev": false,
			"mandatory-start": false,
			"mandatory-test": false,
		});

		expect(rules[0].name).toEqual("no-default-test");
	});
});
