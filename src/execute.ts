import {Rule, PackageScripts} from "./types";
import {dump, warning} from "./reporter";

const execute = (rules: Array<Rule>, scripts: PackageScripts) => {
	dump();

	const executeObjectRule = ({validate, message, name}: Rule) => {
		const valid = typeof validate === "function" && validate(scripts);

		// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
		if (!valid) {
			warning(`${message} (${name})`);
		}
	};

	const executeEntryRule = ({validate, message, name}: Rule) => {
		const pairs = Object.entries(scripts);

		pairs.forEach(
			([key, value]) => {
				const valid = typeof validate === "function" && validate(key, value);

				// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
				if (!valid) {
					warning(`${message} (${name})`, {name: key});
				}
			}
		);
	};

	rules.forEach((rule) => {
		if (rule.isObjectRule) {
			executeObjectRule(rule);
		} else {
			executeEntryRule(rule);
		}
	});

	return dump() > 0;
};

export default execute;
