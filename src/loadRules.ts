import defaultRuleSets, {optionalRules} from "./defaultRuleSets";
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

const loadDefaultRulesFromSet = (strict: boolean): Array<Rule> => {
	if (strict) {
		return defaultRuleSets.strict
			.map((name: string) => getRuleByName(defaultRules, name))
			.filter((r): r is Rule => r !== null);
	}

	return defaultRuleSets.default
		.map((name: string) => getRuleByName(defaultRules, name))
		.filter((r): r is Rule => r !== null);
};

const loadOptionalRules = (): Array<Rule> => {
	return optionalRules
		.map((name: string) => getRuleByName(defaultRules, name))
		.filter((r): r is Rule => r !== null);
};

export const loadRulesFromRuleConfig = (
	strict: boolean,
	rulesConfig?: RulesConfig,
	customRules?: Array<Rule>
): Array<Rule> => {
	const optionalRules = loadOptionalRules();
	const rules = loadDefaultRulesFromSet(strict);

	// standard rulesets apply
	if (!rulesConfig) {
		return rules;
	}

	// there's custom rules loaded
	const loadedCustomRules = customRules
		? customRules.filter((cr: Rule) => rulesConfig[cr.name])
		: [];

	// there's enabled optional rules
	const enabledOptionalRules = optionalRules.filter(
		({ name }) => name in rulesConfig && Boolean(rulesConfig[name])
	);

	return [...loadedCustomRules, ...enabledOptionalRules, ...rules].filter(
		({ name }) => !(name in rulesConfig) || rulesConfig[name] !== false
	);
};
