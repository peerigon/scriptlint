import {cosmiconfigSync} from "cosmiconfig";
import {Config as CosmiconfigConfig} from "cosmiconfig/dist/types";
import {error} from "./cliReporter";
import {PROJECT_NAME} from "./constants";
// Types
import {Config} from "./types";

export const defaultConfig: Config = {
	strict: false,
	fix: false,
	json: false,
	config: false,
	rules: {},
	customRules: [],
	ignoreScripts: [],
};

export const sanitizeConfig = (loadedConfig: CosmiconfigConfig): Config => {
	const sanitized = {...defaultConfig, ...loadedConfig};

	Object.keys(sanitized).forEach((key: string) => {
		const keyExists = Object.keys(defaultConfig).includes(key);

		if (!keyExists) {
			delete sanitized[key];
			error(`unknown config key "${key}"`);
		}
	});

	return sanitized;
};

const loadConfig = (name = PROJECT_NAME): Config => {
	const explorerSync = cosmiconfigSync(name);
	const searchedFor = explorerSync.search();

	if (!searchedFor) {
		return defaultConfig;
	}

	return sanitizeConfig(searchedFor.config);
};

export default loadConfig;
