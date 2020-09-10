import EditJson from "./editJson";
import { PackageScripts } from "./types";
import { filterPackageScriptsByKeys } from "./utils";

export default (wd: string) => {
	const file = new EditJson(wd);

	return {
		readPackageScripts: (ignores: Array<string>): PackageScripts => {
			const { scripts } = file.get();

			return filterPackageScriptsByKeys(scripts, ignores);
		},

		writePackageScripts: (scripts: PackageScripts) => {
			file.set("scripts", scripts);

			return file.save();
		}
	};
};
