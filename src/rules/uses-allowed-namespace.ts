import {NAMESPACES} from "../constants";

export default {
	name: "uses-allowed-namespace",
	isObjectRule: false,
	message:
		'script name "{{name}}" should start with one of the allowed namespaces',
	validate: (key: string) =>
		NAMESPACES.some(n => key === n) ||
		NAMESPACES.some(n => key.startsWith(`${n}:`)) ||
		NAMESPACES.some(n => key.startsWith("pre")) ||
		NAMESPACES.some(n => key.startsWith("post")),
	fix: (key: string, value: string) => ([`other:${key}`, value]),
};
