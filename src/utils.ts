import fs from "fs";
import path from "path";
import { PackageScripts, Values } from "./types";

export const makePackageFilePath = (packageFile: string): string => {
	// resolve package.json path
	packageFile = packageFile.endsWith("/package.json")
		? packageFile
		: packageFile + "/package.json";

	packageFile = path.resolve(packageFile);

	// does it exist?
	if (!fs.existsSync(packageFile)) {
		throw new Error(`No such package.json found: ${packageFile}`);
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
