import {cosmiconfigSync} from "cosmiconfig";
import {Config as CosmiconfigConfig} from "cosmiconfig/dist/types";
import {PROJECT_NAME, DEFAULT_CONFIG} from "./constants";
// Types
import { Config } from "./types";

export const sanitizeConfig = (loadedConfig: CosmiconfigConfig): Config => {
	const sanitized = {...DEFAULT_CONFIG, ...loadedConfig};

	Object.keys(sanitized).forEach((key: string) => {
		const keyExists = Object.keys(DEFAULT_CONFIG).includes(key);

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
		return DEFAULT_CONFIG;
	}

	return sanitizeConfig(searchedFor.config);
};

export default loadConfig;
