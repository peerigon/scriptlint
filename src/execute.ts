import {Rule, PackageScripts} from "./types";
import {dump, warning} from "./reporter";

export const fromEntries = (
	iterable: Array<[string, string]>
): PackageScripts => {
	return [...iterable].reduce((obj: PackageScripts, [key, val]) => {
		obj[key] = val;

		return obj;
	}, {});
};

export const patchScriptObjectEntry = (
	scripts: PackageScripts,
	fromKey: string,
	toKey: string,
	value: string
) =>
	fromEntries(
		Object.entries(scripts).map(([k, v]) => {
			return k === fromKey ? [toKey, value] : [k, v];
		})
	);

const execute = (
	rules: Array<Rule>,
	scripts: PackageScripts,
	configFix = false
): [Array<string>, PackageScripts] => {
	dump();
	const issues: Array<string> = [];

	const patchPackageFile = (newScripts: PackageScripts) => {
		scripts = newScripts;
	};

	const executeObjectRule = ({validate, message, name, fix}: Rule) => {
		const validationResult =
			typeof validate === "function" && validate(scripts);

		const fixable = typeof fix === "function";

		const valid =
			typeof validationResult === "boolean" ?
				validationResult :
				validationResult.length < 1;

		if (!valid) {
			if (configFix && fixable && fix) {
				patchPackageFile(fix(scripts));

				return;
			}

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

	const executeEntryRule = ({validate, message, name, fix}: Rule) => {
		const fixable = typeof fix === "function";
		const pairs = Object.entries(scripts);

		pairs.forEach(([key, value]) => {
			const valid =
				typeof validate === "function" && validate(key, value, scripts);

			if (!valid) {
				if (configFix && fixable && fix) {
					const fixedEntry = fix(key, value);

					const fixedScripts = patchScriptObjectEntry(
						scripts,
						key,
						fixedEntry[0],
						fixedEntry[1]
					);

					patchPackageFile(fixedScripts);

					return;
				}
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

	return [issues, scripts];
};

export default execute;
