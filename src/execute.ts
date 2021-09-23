import { Rule, PackageScripts, JsonMessage } from "./types";
import { makeMessage, patchScriptObjectEntry } from "./utils";
import { ValidationFunctionInvalidError } from "./errors";

const execute = (
	rules: Array<Rule>,
	scripts: PackageScripts,
	warning?: (template: string, values?: string | Array<string>) => void,
	configFix = false
): [Array<JsonMessage>, PackageScripts, number] => {
	/**
	 * keep track of everything
	 */

	const issues: Array<JsonMessage> = [];
	let issuesFixed = 0;

	const patchScripts = (newScripts: PackageScripts) => {
		issuesFixed++;
		scripts = newScripts;
	};

	/**
	 * execution functions
	 */

	const executeObjectRule = ({ validate, message, name, fix }: Rule) => {
		if (typeof validate !== "function") {
			throw new ValidationFunctionInvalidError(
				`Rule validation function is not a function (${name})`
			);
		}

		const validationResult = validate(scripts);

		const fixable = typeof fix === "function";

		/**
		 * validate
		 */

		const valid =
			typeof validationResult === "boolean"
				? validationResult
				: validationResult.length < 1;

		if (valid) {
			return;
		}

		/**
		 * warn of invalidity
		 */
		const warningMessage =
			typeof validationResult === "boolean"
				? `${message} (${name})`
				: makeMessage(`${message} (${name})`, {
						names: validationResult.join(", "),
				  });

		/**
		 * potentially fix
		 */

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (configFix && fixable && fix) {
			patchScripts(fix(scripts));

			return;
		}

		/**
		 * keep track of everything
		 */

		issues.push({
			name,
			affected: undefined,
			type: "warning", // at some point we should really use this
			message: warningMessage,
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

		/**
		 * iterate all the scripts
		 */

		pairs.forEach(([key, value]) => {
			const valid = validate(key, value, scripts);

			if (valid) {
				return;
			}

			const warningMessage = makeMessage(`${message} (${name})`, {
				name: key,
			});

			/**
			 * potentially fix
			 */

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (configFix && fixable && fix) {
				const [toKey, fixedValue] = fix(key, value);

				const fixedScripts = patchScriptObjectEntry(
					scripts,
					key,
					toKey,
					fixedValue
				);

				patchScripts(fixedScripts);

				return;
			}

			/**
			 * keep track of everything
			 */

			issues.push({
				name,
				affected: key,
				type: "warning", // at some point we should really use this
				message: warningMessage,
			});

			if (typeof warning === "function") {
				warning(warningMessage, key);
			}
		});
	};

	/**
	 * and go!
	 */

	rules.forEach((rule) => {
		if (rule.isObjectRule) {
			executeObjectRule(rule);
		} else {
			executeEntryRule(rule);
		}
	});

	return [issues, scripts, issuesFixed];
};

export default execute;
