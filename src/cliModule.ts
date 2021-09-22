/* eslint-disable no-process-exit */
import loadUserConfig from "./userConfig";
import loadCliConfig from "./cliConfig";
import { makePackageFilePath } from "./utils";
import userPackageScriptContext from "./userPackageScripts";
import { loadRulesFromRuleConfig } from "./loadRules";
import execute from "./execute";
import { success, warning, dump, error } from "./consoleReporter";
import {
	DEFAULT_CONFIG,
	PROCESS_EXIT_ERROR,
	PROCESS_EXIT_OK,
} from "./constants";

/* istanbul ignore next */
const processExit = (code: number) => {
	if (typeof process.env.JEST_WORKER_ID === "undefined") {
		// eslint-disable-next-line node/no-process-exit
		process.exit(code);
	}
};

export default (argv: Array<string>) => {
	try {
		/**
		 * config assembly
		 */

		const userConfig = loadUserConfig();
		const cliConfig = loadCliConfig(argv);

		const config = {
			...DEFAULT_CONFIG,
			...{ json: false },
			...userConfig,
			...cliConfig,
		};

		// output the config (--config) but only if we don't want JSON output on the CLI
		if (!config.json && config.config) {
			const json = JSON.stringify(config, null, 2);

			// eslint-disable-next-line no-console
			console.log(`\n\n${json}\n\n`);
		}

		/**
		 * package.json
		 */

		const {
			writePackageScripts,
			readPackageScripts,
		} = userPackageScriptContext(
			makePackageFilePath(config.packageFile)
		);

		const scripts = readPackageScripts(config.ignoreScripts);

		/**
		 * rule loading
		 */

		const rules = loadRulesFromRuleConfig(
			config.strict,
			config.rules,
			config.customRules
		);

		/**
		 * and go!
		 */
		const [issues, fixedScripts, issuesFixed] = execute(
			rules,
			scripts,
			warning,
			config.fix
		);

		if (config.fix && issuesFixed > 0) {
			writePackageScripts(fixedScripts);
			success(`Fixed ${issuesFixed} issue${issuesFixed > 1 ? "s" : ""}!`);
		}

		if (issues.length - issuesFixed === 0) {
			success("✨  All good");

			dump(config.json);

			processExit(PROCESS_EXIT_OK);
		}

		dump(config.json);
		processExit(PROCESS_EXIT_ERROR);
	} catch (err) {
		error(err);
	}
};
