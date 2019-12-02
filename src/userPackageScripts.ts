import path from "path";
import fs from "fs";
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

const userPackageScripts = (ignores: Array<string>): PackageScripts => {
	try {
		const packageLocation = path.join(process.cwd(), "package.json");
		const packageJson = fs.readFileSync(packageLocation, "utf-8");
		const {scripts} = JSON.parse(packageJson);

		if (typeof scripts === "undefined") {
			throw Error;
		}

		return filterPackageScriptsByKeys(scripts, ignores);
	} catch (error) {
		throw new Error("Cannot read package.json");
	}
};

export default userPackageScripts;
