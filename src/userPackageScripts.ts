import path from "path";
import editJson from "./editJson";
import {PackageScripts} from "./types";

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

const filePath = path.join(process.cwd(), "package.json");
const file = editJson(filePath);

export const readPackageScripts = (ignores: Array<string>): PackageScripts => {
	const {scripts} = file.get();

	return filterPackageScriptsByKeys(scripts, ignores);
};

const readPackageJsonFromCwd = (ignores: Array<string>): PackageScripts => {
	return readPackageScripts(ignores);
};

export const writePackageScripts = (scripts: PackageScripts) => {
	file.set("scripts", scripts);
	file.save();
};

export default readPackageJsonFromCwd;
