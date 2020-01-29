import {DEFAULT_NPM_HOOKS} from "../constants";

export default {
	name: "no-aliases",
	isObjectRule: false,
	message: "don't alias binaries, use npx/yarn instead ({{name}})",
	validate: (key: string, value: string) =>
		key !== value || DEFAULT_NPM_HOOKS.includes(key),
};
