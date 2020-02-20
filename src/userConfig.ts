import { cosmiconfigSync } from "cosmiconfig";
import { Config as CosmiconfigConfig } from "cosmiconfig/dist/types";
import { PROJECT_NAME } from "./constants";
// Types
import { Config } from "./types";

export const defaultConfig: Config = {
	strict: false,
	fix: false,
	json: true,
	config: false,
	packageFile: undefined,
	rules: {},
	customRules: [],
	ignoreScripts: []
};

export const sanitizeConfig = (loadedConfig: CosmiconfigConfig): Config => {
	const sanitized = { ...defaultConfig, ...loadedConfig };

	Object.keys(sanitized).forEach((key: string) => {
		const keyExists = Object.keys(defaultConfig).includes(key);

		if (!keyExists) {
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete sanitized[key];
			throw new Error(`unknown config key "${key}"`);
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
