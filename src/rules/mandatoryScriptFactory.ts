import { PackageScripts, Rule } from "../types";

export default (name: string): Rule => ({
	isObjectRule: true,
	name: `mandatory-${name}`,
	message: `must contain a "${name}" script`,
	validate: (scripts: PackageScripts) => Object.keys(scripts).includes(name)
});
