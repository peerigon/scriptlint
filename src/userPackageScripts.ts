import path from "path";
import eJF from "edit-json-file";
import {IGNORE_SCRIPT_NAMES} from "./constants";
import {PackageScripts, PackageFile} from "./types";

type Config = {
	ignore: Array<string>;
};

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

const file = eJF(path.join(process.cwd(), "package.json"));

export const readPackageFile = (): PackageFile => {
	return file.get();
};

export const readPackageScripts = (ignores: Array<string>): PackageScripts => {
	const {scripts} = readPackageFile();

	return filterPackageScriptsByKeys(scripts, [
		...IGNORE_SCRIPT_NAMES,
		...ignores,
	]);
};

const readPackageJsonFromCwd = (ignores: Array<string>): PackageScripts => {
	return readPackageScripts(ignores);
};

export const writePackageScripts = (scripts: PackageScripts) => {
	file.set("scripts", scripts);
	file.save();
};

export default readPackageJsonFromCwd;
