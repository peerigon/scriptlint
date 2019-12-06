#!/usr/bin/env node

import loadUserConfig from "./userConfig";
import userPackageScripts from "./userPackageScripts";
import {loadRulesFromRuleConfig} from "./rules";
import execute from "./execute";

const userConfig = loadUserConfig();
const scripts = userPackageScripts(userConfig.ignoreScripts);
const rules = loadRulesFromRuleConfig(userConfig.extends, userConfig.rules);
const issues = execute(rules, scripts);

if (issues.length > 0) {
	// eslint-disable-next-line no-process-exit
	process.exit(1);
}
