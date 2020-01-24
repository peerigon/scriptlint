import path from "path";
import fs from "fs";
import eJF from "edit-json-file";
import detectIndent from "detect-indent";
import {IGNORE_SCRIPT_NAMES} from "./constants";
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
const {indent} = detectIndent(fs.readFileSync(filePath, "utf8"));

const file = eJF(filePath, {
	// eslint-disable-next-line @typescript-eslint/camelcase
	stringify_width: indent || 2,
});

export const readPackageScripts = (ignores: Array<string>): PackageScripts => {
	const {scripts} = file.get();

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
