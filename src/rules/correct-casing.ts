import {NAME_REGEX} from "../constants";

export default {
	name: "correct-casing",
	isObjectRule: false,
	message: 'script name "{{name}}" must be camel case',
	validate: (key: string) => NAME_REGEX.test(key),
};
