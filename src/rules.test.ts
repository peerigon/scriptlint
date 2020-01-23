import {
	loadRulesFromRuleConfig,
	getRuleByName,
	loadRulesFromSet,
} from "./rules";
import defaultRules from "./defaultRules";
import {PROJECT_NAME} from "./constants";

describe("rules.ts", () => {
	// one in string, one in Array<string> configuration
	const defaultRulesLoaded = loadRulesFromRuleConfig(PROJECT_NAME + "/default");
	const strictRulesLoaded = loadRulesFromRuleConfig([PROJECT_NAME + "/strict"]);

	it("loads correct amount of rules", () => {
		expect(strictRulesLoaded.length).toBe(defaultRules.length);
	});

	test("getRuleByName() nulls on unknown name", () => {
		expect(getRuleByName(defaultRulesLoaded, "foo")).toBe(null);
		expect(
			getRuleByName(defaultRulesLoaded, "mandatory-dev")
		).toMatchSnapshot();
	});

	test("loadRulesFromSet() defaults on unknown plugin", () => {
		expect(loadRulesFromSet("foo")).toEqual(defaultRulesLoaded);
	});

	test("loadRulesFromSet() defaults on unknown default set", () => {
		expect(loadRulesFromSet(PROJECT_NAME + "/unknown")).toEqual(
			defaultRulesLoaded
		);
	});

	test("loadRulesFromSet() excludes rules by config", () => {
		const rules = loadRulesFromRuleConfig([PROJECT_NAME + "/default"], {
			"mandatory-dev": false,
			"mandatory-start": false,
			"mandatory-test": false,
		});

		expect(rules[0].name).toEqual("no-default-test");
	});
});
