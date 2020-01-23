import {NAME_REGEX, NAMESPACES, IGNORE_SCRIPT_NAMES} from "./constants";
import {PackageScripts, Rule} from "./types";
import {filterPackageScriptsByKeys} from "./userPackageScripts";

const makeMandatoryName = (name: string): Rule => ({
	isObjectRule: true,
	name: `mandatory-${name}`,
	message: `must contain a "${name}" script`,
	validate: (scripts: PackageScripts) => Object.keys(scripts).includes(name),
});

const rules = [
	makeMandatoryName("test"),
	makeMandatoryName("start"),
	makeMandatoryName("dev"),
	{
		name: "no-default-test",
		isObjectRule: true,
		message: "`test` script can't be the default script",
		validate: (scripts: PackageScripts) => {
			if (Object.keys(scripts).includes("test")) {
				return (
					scripts.test !== 'echo "Error: no test specified" && exit 1'
				);
			}

			return true;
		},
	},
	{
		name: "correct-casing",
		isObjectRule: false,
		message: 'script name "{{name}}" must be camel case',
		validate: (key: string) => NAME_REGEX.test(key),
	},
	{
		name: "no-aliases",
		isObjectRule: false,
		message: "don't alias binaries, use npx/yarn instead",
		validate: (key: string, value: string) => key !== value,
	},
	{
		name: "uses-allowed-namespace",
		isObjectRule: false,
		message:
			'script name "{{name}}" should start with one of the allowed namespaces',
		validate: (key: string) =>
			NAMESPACES.some(n => key === n) ||
			NAMESPACES.some(n => key.startsWith(`${n}:`)) ||
			NAMESPACES.some(n => key.startsWith("pre")) ||
			NAMESPACES.some(n => key.startsWith("post")),
	},
	{
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
	},
];

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

export default rules;
