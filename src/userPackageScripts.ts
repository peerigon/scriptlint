import path from "path";
import fs from "fs";
import {PackageScripts} from "./types";
import {IGNORE_SCRIPT_NAMES} from "./constants";

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

export const readPackageScripts = (
	cwd: string,
	ignores: Array<string>
): PackageScripts => {
	try {
		const packageLocation = path.join(cwd, "package.json");
		const packageJson = fs.readFileSync(packageLocation, "utf-8");
		const {scripts} = JSON.parse(packageJson);

		return filterPackageScriptsByKeys(scripts, [
			...IGNORE_SCRIPT_NAMES,
			...ignores,
		]);
	} catch (_) {
		throw new Error("Cannot read package.json");
	}
};

const readPackageJsonFromCwd = (ignores: Array<string>): PackageScripts => {
	return readPackageScripts(process.cwd(), ignores);
};

export default readPackageJsonFromCwd;
