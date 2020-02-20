import { DEFAULT_NPM_HOOKS } from "../constants";
import { PackageScripts } from "../types";
import { filterPackageScriptsByKeys } from "../utils";

const getMissingHooks = (prefix: string, scripts: PackageScripts) => {
	const keys = Object.keys(scripts);
	const hooks = keys.filter((k: string) => k.startsWith(prefix));
	const hooksMissing: Array<string> = [];

	hooks.forEach((hookName: string) => {
		const triggerName = hookName.substr(prefix.length);

		if (!keys.includes(triggerName)) {
			hooksMissing.push(triggerName);
		}
	});

	return hooksMissing;
};

export default {
	name: "prepost-trigger-defined",
	isObjectRule: true,
	message:
		"some custom hooks ({{names}}) are missing their trigger script(s)",
	validate: (scripts: PackageScripts): boolean | Array<string> => {
		scripts = filterPackageScriptsByKeys(scripts, DEFAULT_NPM_HOOKS);
		const preHooksMissing = getMissingHooks("pre", scripts);
		const postHooksMissing = getMissingHooks("post", scripts);

		const allMissing = [
			...preHooksMissing.map(s => `pre${s}`),
			...postHooksMissing.map(s => `post${s}`)
		];

		return allMissing.length < 1 ? true : allMissing;
	}
};
