import {PackageScripts} from "../types";

export const sortScripts = (scripts: PackageScripts): PackageScripts =>
	Object.entries(scripts)
		.sort((a, b) => {
			return a < b ? -1 : 1;
		})
		.reduce((r, [k, v]) => ({...r, [k]: v}), {});

export default {
	name: "alphabetic-order",
	isObjectRule: true,
	message: "scripts must be in alphabetic order",
	validate: (scripts: PackageScripts) => {
		const sorted = sortScripts(scripts);

		return Object.keys(sorted).join("|") === Object.keys(scripts).join("|");
	},
	fix: (scripts: PackageScripts) => sortScripts(scripts),
};
