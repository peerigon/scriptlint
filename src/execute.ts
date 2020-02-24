import { Rule, PackageScripts, JsonMessage } from "./types";
import { makeMessage, patchScriptObjectEntry } from "./utils";
import { ValidationFunctionInvalidError } from "./errors";

const execute = (
	rules: Array<Rule>,
	scripts: PackageScripts,
	warning?: (template: string, values?: string | Array<string>) => void,
	configFix = false
): [Array<JsonMessage>, PackageScripts, number] => {
	const issues: Array<JsonMessage> = [];
	let issuesFixed = 0;

	const patchPackageFile = (newScripts: PackageScripts) => {
		issuesFixed++;
		scripts = newScripts;
	};

	const executeObjectRule = ({ validate, message, name, fix }: Rule) => {
		if (typeof validate !== "function") {
			throw new ValidationFunctionInvalidError(
				`Rule validation function is not a function (${name})`
			);
		}

		const validationResult = validate(scripts);

		const fixable = typeof fix === "function";

		const valid =
			typeof validationResult === "boolean"
				? validationResult
				: validationResult.length < 1;

		if (valid) {
			return;
		}

		const warningMessage =
			typeof validationResult === "boolean"
				? `${message} (${name})`
				: makeMessage(`${message} (${name})`, {
					names: validationResult.join(", ")
				  });

		if (configFix && fixable && fix) {
			patchPackageFile(fix(scripts));

			return;
		}

		issues.push({
			name,
			affected: undefined,
			type: "warning", // at some point we should really use this
			message: warningMessage
		});

		if (typeof warning === "function") {
			warning(warningMessage, validationResult);
		}
	};

	const executeEntryRule = ({ validate, message, name, fix }: Rule) => {
		if (typeof validate !== "function") {
			throw new ValidationFunctionInvalidError(name);
		}

		const fixable = typeof fix === "function";
		const pairs = Object.entries(scripts);

		pairs.forEach(([key, value]) => {
			const valid = validate(key, value, scripts);

			if (valid) {
				return;
			}

			const warningMessage = makeMessage(`${message} (${name})`, {
				name: key
			});

			if (configFix && fixable && fix) {
				const [toKey, fixedValue] = fix(key, value);

				const fixedScripts = patchScriptObjectEntry(
					scripts,
					key,
					toKey,
					fixedValue
				);

				patchPackageFile(fixedScripts);

				return;
			}

			issues.push({
				name,
				affected: key,
				type: "warning", // at some point we should really use this
				message: warningMessage
			});

			if (typeof warning === "function") {
				warning(warningMessage, key);
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
