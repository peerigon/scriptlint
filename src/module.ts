#!/usr/bin/env node
import userPackageScriptContext from "./userPackageScripts";
import { loadRulesFromRuleConfig } from "./loadRules";
import { ConfigError } from "./errors";
import execute from "./execute";
import { DEFAULT_CONFIG } from "./constants";
import { Config } from "./types";
import { makePackageFilePath } from "./utils";

export default (moduleConfig: Partial<Config>) => {
	/**
	 * validate config
	 */

	if (moduleConfig.packageFile && moduleConfig.packageScripts) {
		throw new ConfigError(
			"Either specify a package.json location or a scripts object but not both" +
				JSON.stringify(moduleConfig)
		);
	}

	if (!moduleConfig.packageFile && !moduleConfig.packageScripts) {
		throw new ConfigError(
			"You have to specify a package.json location or a scripts object"
		);
	}

	const config = { ...DEFAULT_CONFIG, ...moduleConfig };

	/**
	 * find scripts
	 */
	let scripts = moduleConfig.packageScripts ?? {};

	if (!moduleConfig.packageScripts && moduleConfig.packageFile) {
		const { readPackageScripts } = userPackageScriptContext(
			makePackageFilePath(config.packageFile ?? "")
		);

		scripts = readPackageScripts(config.ignoreScripts);
	}

	/**
	 * ok go!
	 */
	const rules = loadRulesFromRuleConfig(
		config.strict,
		config.rules,
		config.customRules
	);

	const [issues, fixedScripts] = execute(
		rules,
		scripts,
		() => {},
		config.fix
	);

	return {
		issues,
		scripts: config.fix ? fixedScripts : scripts,
	};
};
