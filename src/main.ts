import path from "path";
import fs from "fs";
import loadUserConfig from "./userConfig";
import loadCliConfig from "./cliConfig";
import userPackageScriptContext from "./userPackageScripts";
import { loadRulesFromRuleConfig } from "./loadRules";
import execute from "./execute";
import makeReporter from "./reporters";
import {DEFAULT_CONFIG} from "./constants";
import {
	Config,
	RuntimeEnv,
	PackageScripts,
} from "./types";

export default (
	moduleConfig: Partial<Config> = {
		json: true
	},
	runtimeEnv: RuntimeEnv = "module"
// eslint-disable-next-line consistent-return
) => {
	if (moduleConfig.packageFile && moduleConfig.packageScripts) {
		throw new Error(
			"Either specify a package.json location or a scripts object but not both" +
				JSON.stringify(moduleConfig)
		);
	}
	if (!moduleConfig.packageFile && !moduleConfig.packageScripts) {
		throw new Error(
			"You have to specify a package.json location or a scripts object"
		);
	}

	let config = {...DEFAULT_CONFIG, ...moduleConfig};

	if (runtimeEnv === "cli") {
		const userConfig = loadUserConfig();
		const cliConfig = loadCliConfig(process.argv);

		config = { ...userConfig, ...cliConfig, ...moduleConfig };
	}

	if (!config.json && config.config && runtimeEnv === "cli") {
		const json = JSON.stringify(config, null, 2);

		// eslint-disable-next-line no-console
		console.log(`\n\n${json}\n\n`);
	}

	const {success, warning, dump, get} = makeReporter(
		config.json ? "json" : "console.log"
	);

	let scripts = moduleConfig.packageScripts || {};
	let writePackageScripts = (scripts: PackageScripts) => {};

	if (!moduleConfig.packageScripts) {
		config.packageFile = path.resolve(config.packageFile || "./");
		config.packageFile = config.packageFile.endsWith("/package.json") ?
			config.packageFile :
			config.packageFile + "/package.json";

		if (!fs.existsSync(config.packageFile)) {
			throw new Error(
				`No such package.json found: ${config.packageFile}`
			);
		}

		const uPSContext = userPackageScriptContext(config.packageFile);

		writePackageScripts = uPSContext.writePackageScripts;

		scripts = uPSContext.readPackageScripts(config.ignoreScripts);
	}

	const rules = loadRulesFromRuleConfig(
		config.strict,
		config.rules,
		config.customRules
	);

	let totalIssuesFixed = 0;

	// eslint-disable-next-line consistent-return

	const [issues, fixedScripts, issuesFixed] = execute(
		rules,
		scripts,
		warning,
		config.fix
	);

	if (issuesFixed > 0) {
		totalIssuesFixed += issuesFixed;
		scripts = fixedScripts;
	} else if (config.fix) {
		writePackageScripts(fixedScripts);
	}

	if (issues.length > 0) {
		if (totalIssuesFixed > 0) {
			success(
				`Fixed ${totalIssuesFixed} issue${
					totalIssuesFixed > 1 ? "s" : ""
				}!`
			);
		}
		if (runtimeEnv === "cli") {
			dump();
		} else {
			return get();
		}
		// eslint-disable-next-line no-process-exit
		process.exit(1);
	} else {
		if (runtimeEnv === "cli") {
			success("✨  All good");
			dump();
		} else {
			return [];
		}
		// eslint-disable-next-line no-process-exit
		process.exit(0);
	}
};
