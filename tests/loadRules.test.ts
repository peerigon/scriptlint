import { loadRulesFromRuleConfig, getRuleByName } from "../src/loadRules";
import defaultRules from "../src/rules";
import {optionalRules} from "../src/defaultRuleSets";

describe("loadRules.ts", () => {
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
				.map((r) => r.name)
				.filter((r) => r === customRule.name)[0]
		).toBe(customRule.name);
	});

	it("loads optional rules", () => {
		const rulesWithCustomRule = loadRulesFromRuleConfig(
			false,
			{
				"natural-order": true,
			}
		);

		expect(rulesWithCustomRule.map(r => r.name)[0]).toBe("natural-order");
	});

	it("loads correct amount of rules", () => {
		expect(strictRulesLoaded.length).toBe(defaultRules.length - optionalRules.length);
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

	test("loadRulesFromSet() adds custom rules", () => {
		const rules = loadRulesFromRuleConfig(
			true,
			{
				foobarbaz: true,
			},
			[
				{
					name: "foobarbaz",
					isObjectRule: true,
					message: "barbazfoo",
					validate: () => true,
				},
			]
		);

		expect(rules[0].name).toEqual("foobarbaz");
	});

	test("loadRulesFromSet() ignores custom rules that are not loaded", () => {
		const rules = loadRulesFromRuleConfig(false, {}, [
			{
				name: "foobarbaz",
				isObjectRule: true,
				message: "barbazfoo",
				validate: () => true,
			},
		]);

		expect(rules.map((r) => r.name).includes("foobarbaz")).toBe(false);
	});
});
