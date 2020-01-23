import {Rule, PackageScripts} from "./types";
import {dump, warning} from "./reporter";

const execute = (
	rules: Array<Rule>,
	scripts: PackageScripts
): Array<string> => {
	dump();
	const issues: Array<string> = [];

	const executeObjectRule = ({validate, message, name}: Rule) => {
		const validationResult =
			typeof validate === "function" && validate(scripts);

		const valid =
			typeof validationResult === "boolean" ?
				validationResult :
				validationResult.length < 1;

		if (!valid) {
			issues.push(name);
			if (typeof validationResult === "boolean") {
				warning(`${message} (${name})`);
			} else {
				warning(`${message} (${name})`, {
					names: validationResult.join(", "),
				});
			}
		}
	};

	const executeEntryRule = ({validate, message, name}: Rule) => {
		const pairs = Object.entries(scripts);

		pairs.forEach(([key, value]) => {
			const valid =
				typeof validate === "function" && validate(key, value, scripts);

			if (!valid) {
				issues.push(`${name} (${key})`);
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

	dump();

	return issues;
};

export default execute;
