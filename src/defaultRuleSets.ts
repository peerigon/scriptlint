import defaultRules from "./rules";
import { Rule } from "./types";

export const optionalRules = ["natural-order"];

const strict = defaultRules
	.map((r: Rule) => r.name)
	.filter((r) => !optionalRules.includes(r));

const ruleSets = {
	default: [
		"mandatory-test",
		"mandatory-start",
		"mandatory-dev",
		"no-default-test",
	],
	strict,
	optionalRules,
};

export default ruleSets;
