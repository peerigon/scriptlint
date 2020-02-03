#!/usr/bin/env node

import loadUserConfig from "./userConfig";
import loadCliConfig from "./cliConfig";
import userPackageScriptContext from "./userPackageScripts";
import {loadRulesFromRuleConfig} from "./loadRules";
import execute from "./execute";
import makeReporter from "./reporters";

const userConfig = loadUserConfig();
const cliConfig = loadCliConfig(process.argv);
const config = {...userConfig, ...cliConfig};

if (config.config) {
	const json = JSON.stringify(config, null, 2);

	// eslint-disable-next-line no-console
	console.log(`\n\n${json}\n\n`);
}

const {success, warning, dump} = makeReporter(config.json ? "json" : "cli");

const {readPackageScripts, writePackageScripts} = userPackageScriptContext(
	process.cwd()
);

let scripts = readPackageScripts(config.ignoreScripts);

const rules = loadRulesFromRuleConfig(
	config.strict,
	config.rules,
	config.customRules
);

let totalIssuesFixed = 0;

const run = () => {
	const [issues, fixedScripts, issuesFixed] = execute(
		rules,
		scripts,
		warning,
		config.fix
	);

	if (issuesFixed > 0) {
		totalIssuesFixed += issuesFixed;
		scripts = fixedScripts;
		run();
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
		dump();
		// eslint-disable-next-line no-process-exit
		process.exit(1);
	} else {
		success("✨  All good");
		dump();
		// eslint-disable-next-line no-process-exit
		process.exit(0);
	}
};

run();
