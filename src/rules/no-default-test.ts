import { PackageScripts } from "../types";

export default {
	name: "no-default-test",
	isObjectRule: true,
	message: "`test` script can't be the default script",
	validate: (scripts: PackageScripts) => {
		if (Object.keys(scripts).includes("test")) {
			return scripts.test !== 'echo "Error: no test specified" && exit 1';
		}

		return true;
	},
};
