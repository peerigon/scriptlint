import { PackageScripts, Values } from "./types";

export const slugify = (str: string): string =>
	str
		.trim()
		.toLowerCase()
		.replace(/[^-A-Za-z]/g, "-")
		.replace(/^-/g, "")
		.replace(/-+/g, "-")
		.replace(/-$/g, "");

export const filterPackageScriptsByKeys = (
	raw: PackageScripts,
	removes: Array<string>
): PackageScripts => {
	return Object.keys(raw)
		.filter(k => !removes.includes(k))
		.reduce((obj: PackageScripts, key: string) => {
			obj[key] = raw[key];

			return obj;
		}, {});
};

export const makeMessage = (template: string, values: Values): string => {
	let message = template;

	if (values !== undefined) {
		const pairs = Object.entries(values);

		pairs.forEach(([key, value]) => {
			message = message.replace(`{{${key}}}`, value);
		});
	}

	return message;
};
