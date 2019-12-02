import {NAME_REGEX, NAMESPACES} from "./constants";
import {PackageScripts, Rule} from "./types";

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
				return scripts.test !== 'echo "Error: no test specified" && exit 1';
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
		name: "uses-allowed-namespace",
		isObjectRule: false,
		message: 'script name "{{name}}" should start with one of the allowed namespaces',
		validate: (key: string) =>
			NAMESPACES.some(n => key === n) ||
			NAMESPACES.some(n => key.startsWith(`${n}:`)),
	},
];

export default rules;
