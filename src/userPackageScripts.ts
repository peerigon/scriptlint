import path from "path";
import EditJson from "./editJson";
import {PackageScripts} from "./types";
import {filterPackageScriptsByKeys} from "./utils";

type Config = {
	ignore: Array<string>;
};

const file = new EditJson(path.join(process.cwd(), "package.json"));

export const readPackageScripts = (ignores: Array<string>): PackageScripts => {
	const {scripts} = file.get();

	return filterPackageScriptsByKeys(scripts, ignores);
};

export const writePackageScripts = (scripts: PackageScripts) => {
	file.set("scripts", scripts);

	return file.save();
};

export default readPackageScripts;
