#!/usr/bin/env node

import loadUserConfig from "./userConfig";
import loadCliConfig from "./cliConfig";
import userPackageScripts, {writePackageScripts} from "./userPackageScripts";
import {loadRulesFromRuleConfig} from "./loadRules";
import execute from "./execute";
import {success, dump} from "./reporter";

const userConfig = loadUserConfig();
const cliConfig = loadCliConfig(process.argv);
const config = {...userConfig, ...cliConfig};
let scripts = userPackageScripts(config.ignoreScripts);

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
		config.fix
	);

	if (issuesFixed > 0) {
		totalIssuesFixed += issuesFixed;
		scripts = fixedScripts;
		run();
	} else {
		writePackageScripts(fixedScripts);
	}

	if (issues.length > 0) {
		if (totalIssuesFixed > 0) {
			success(`Fixed ${totalIssuesFixed} issue${totalIssuesFixed > 1 ? "s" : ""}!`);
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
