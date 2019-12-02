import {cosmiconfigSync} from "cosmiconfig";
import {Config as CosmiconfigConfig} from "cosmiconfig/dist/types";
import {error} from "./reporter";
import {PROJECT_NAME} from "./constants";

type Config = {
	extends: Array<string>;
	rules: {
		[key: string]: boolean;
	};
	ignoreScripts: Array<string>;
};

export const defaultConfig: Config = {
	extends: [PROJECT_NAME + "/default"],
	rules: {},
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

	if (sanitized.extends.length < 1) {
		sanitized.extends = defaultConfig.extends;
	}

	return sanitized;
};

const loadConfig = (): Config => {
	const explorerSync = cosmiconfigSync(PROJECT_NAME);
	const searchedFor = explorerSync.search();
	const loadedConfig = searchedFor?.config;

	return sanitizeConfig(loadedConfig);
};

export default loadConfig();
