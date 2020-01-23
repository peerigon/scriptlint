import {PROJECT_NAME} from "./constants";
import {error} from "./reporter";
import defaultRuleSets from "./defaultRuleSets";
import defaultRules from "./defaultRules";
// Types
import {Rule} from "./types";

type RulesConfig = {
	[key: string]: boolean;
};

export const getRuleByName = (rules: Array<Rule>, name: string): Rule | null => {
	const filtered = rules.filter((r: Rule) => r.name === name);

	if (filtered.length < 1) {
		return null;
	}

	return filtered[0];
};

export const loadRulesFromSet = (ruleSet: string): Array<Rule> => {
	let ruleNameList = defaultRuleSets.default;

	if (!ruleSet.startsWith(PROJECT_NAME)) {
		error("plugin loading not implemented yet :)");
	} else if (!ruleSet.endsWith("/default") && !ruleSet.endsWith("/strict")) {
		error("Unknown default rules");
	}

	if (ruleSet === PROJECT_NAME + "/strict") {
		ruleNameList = defaultRuleSets.strict;
	}

	const rulesAndNulls = ruleNameList.map((name: string) => getRuleByName(defaultRules, name));
	const filtered: Array<Rule> = rulesAndNulls.filter((r): r is Rule => r !== null);

	return filtered;
};

export const loadRulesFromRuleConfig = (extend: Array<string> | string, rulesConfig?: RulesConfig): Array<Rule> => {
	if (typeof extend === "string") {
		extend = [extend];
	}
	const rules = extend.map(loadRulesFromSet);

	const loadedRules = rules.reduce((allRules: Array<Rule>, theseRules: Array<Rule>) => {
		return [...allRules, ...theseRules];
	}, []);

	if (!rulesConfig) {
		return loadedRules;
	}

	return loadedRules.map((rule: Rule) => {
		if (rulesConfig && rule.name in rulesConfig && rulesConfig[rule.name] === false) {
			return null;
		}

		return rule;
	}).filter((r): r is Rule => r !== null);
};

