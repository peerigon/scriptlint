import { NAMESPACES, DEFAULT_NPM_HOOKS } from "../constants";

const validate = (key: string): boolean =>
	NAMESPACES.some(n => key === n) ||
	NAMESPACES.some(n => key.startsWith(`${n}:`)) ||
	DEFAULT_NPM_HOOKS.includes(key) ||
	(key.startsWith("pre") && validate(key.slice(3))) ||
	(key.startsWith("post") && validate(key.slice(4)));

export default {
	name: "uses-allowed-namespace",
	isObjectRule: false,
	message:
		'script name "{{name}}" should start with one of the allowed namespaces',
	validate,
	fix: (key: string, value: string) => [`other:${key}`, value]
};
