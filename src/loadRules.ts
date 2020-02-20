import defaultRuleSets from "./defaultRuleSets";
import defaultRules from "./rules";
// Types
import { Rule } from "./types";

type RulesConfig = {
	[key: string]: boolean;
};

export const getRuleByName = (
	rules: Array<Rule>,
	name: string
): Rule | null => {
	const filtered = rules.filter((r: Rule) => r.name === name);

	if (filtered.length < 1) {
		return null;
	}

	return filtered[0];
};

export const loadDefaultRulesFromSet = (strict: boolean): Array<Rule> => {
	if (strict) {
		return defaultRuleSets.strict
			.map((name: string) => getRuleByName(defaultRules, name))
			.filter((r): r is Rule => r !== null);
	}

	return defaultRuleSets.default
		.map((name: string) => getRuleByName(defaultRules, name))
		.filter((r): r is Rule => r !== null);
};

export const loadRulesFromRuleConfig = (
	strict: boolean,
	rulesConfig?: RulesConfig,
	customRules?: Array<Rule>
): Array<Rule> => {
	const rules = loadDefaultRulesFromSet(strict);

	const loadedCustomRules = (rulesConfig && customRules) ? customRules.filter(
		(cr: Rule) => rulesConfig[cr.name]
	) : [];

	const loadedRules = [...loadedCustomRules, ...rules];

	if (!rulesConfig) {
		return loadedRules;
	}

	return loadedRules
		.map((rule: Rule) => {
			if (rule.name in rulesConfig && rulesConfig[rule.name] === false) {
				return null;
			}

			return rule;
		})
		.filter((r): r is Rule => r !== null);
};
