import { Rule } from "../types";
import { slugify } from "../utils";

export default (regex: RegExp, name: string, alternative?: string): Rule => {
	const slug = slugify(name);

	return {
		name: `no-${slug}`,
		isObjectRule: false,
		message: `Use of ${name} in script '{{name}}' is not allowed, consider using ${alternative}`,
		validate: (_: string, script: string): boolean | string => {
			return !regex.test(script);
		}
	};
};
