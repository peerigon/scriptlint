import {IGNORE_SCRIPT_NAMES} from "../constants";
import {PackageScripts} from "../types";
import {filterPackageScriptsByKeys} from "../userPackageScripts";

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
		scripts = filterPackageScriptsByKeys(scripts, IGNORE_SCRIPT_NAMES);
		const preHooksMissing = getMissingHooks("pre", scripts);
		const postHooksMissing = getMissingHooks("post", scripts);
		const allMissing = [...preHooksMissing, ...postHooksMissing];

		return allMissing.length < 1 ? true : allMissing;
	},
};
