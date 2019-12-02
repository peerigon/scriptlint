import {Rule, PackageScripts} from "./types";
import {dump, warning} from "./reporter";

const execute = (rules: Array<Rule>, scripts: PackageScripts) => {
	dump();

	const executeObjectRule = ({validate, message, name}: Rule) => {
		const validationResult = typeof validate === "function" && validate(scripts);
		const valid = typeof validationResult === "boolean" ? validationResult : validationResult.length < 1;

		if (!valid) {
			if (typeof validationResult === "boolean") {
				warning(`${message} (${name})`);
			} else {
				warning(`${message} (${name})`, {names: validationResult.join(", ")});
			}
		}
	};

	const executeEntryRule = ({validate, message, name}: Rule) => {
		const pairs = Object.entries(scripts);

		pairs.forEach(([key, value]) => {
			const valid = typeof validate === "function" && validate(key, value);

			if (!valid) {
				warning(`${message} (${name})`, {name: key});
			}
		});
	};

	rules.forEach(rule => {
		if (rule.isObjectRule) {
			executeObjectRule(rule);
		} else {
			executeEntryRule(rule);
		}
	});

	return dump() > 0;
};

export default execute;
