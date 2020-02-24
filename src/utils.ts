import fs from "fs";
import path from "path";
import { PackageFileNotFoundError } from "./errors";
import { PackageScripts, Values } from "./types";

export const makePackageFilePath = (packageFile: string): string => {
	// resolve package.json path
	packageFile = packageFile.endsWith("/package.json")
		? packageFile
		: packageFile + "/package.json";

	packageFile = path.resolve(packageFile);

	// does it exist?
	if (!fs.existsSync(packageFile)) {
		throw new PackageFileNotFoundError(packageFile);
	}

	return packageFile;
};

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

export const fromEntries = (
	iterable: Array<[string, string]>
): PackageScripts => {
	return [...iterable].reduce((obj: PackageScripts, [key, val]) => {
		obj[key] = val;

		return obj;
	}, {});
};

export const patchScriptObjectEntry = (
	scripts: PackageScripts,
	fromKey: string,
	toKey: string,
	value: string
) =>
	fromEntries(
		Object.entries(scripts).map(([k, v]) => {
			return k === fromKey ? [toKey, value] : [k, v];
		})
	);
