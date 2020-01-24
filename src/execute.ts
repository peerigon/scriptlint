import {Rule, PackageScripts} from "./types";
import {warning, makeMessage} from "./reporter";

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
): [Array<string>, PackageScripts, number] => {
	const issues: Array<string> = [];
	let issuesFixed = 0;

	const patchPackageFile = (newScripts: PackageScripts) => {
		issuesFixed++;
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
			const warningMessage =
				typeof validationResult === "boolean" ?
					`${message} (${name})` :
					makeMessage(`${message} (${name})`, {
						names: validationResult.join(", "),
					});

			if (configFix && fixable && fix) {
				patchPackageFile(fix(scripts));

				return;
			}

			issues.push(name);
			warning(warningMessage);
		}
	};

	const executeEntryRule = ({validate, message, name, fix}: Rule) => {
		const fixable = typeof fix === "function";
		const pairs = Object.entries(scripts);

		pairs.forEach(([key, value]) => {
			const valid =
				typeof validate === "function" && validate(key, value, scripts);

			if (!valid) {
				const warningMessage = makeMessage(`${message} (${name})`, {name: key});

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
				warning(warningMessage);
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

	return [issues, scripts, issuesFixed];
};

export default execute;
