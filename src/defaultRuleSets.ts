import defaultRules from "./rules";
import {Rule} from "./types";

const ruleSets = {
	default: [
		"mandatory-test",
		"mandatory-start",
		"mandatory-dev",
		"no-default-test",
	],
	strict: defaultRules.map((r: Rule) => r.name),
};

export default ruleSets;
