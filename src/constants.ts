import { Config } from "./types";

export const PROCESS_EXIT_ERROR = 1;
export const PROCESS_EXIT_OK = 0;

export const DEFAULT_CONFIG: Config = {
	strict: false,
	fix: false,
	json: false,
	config: false,
	packageFile: undefined,
	rules: {},
	customRules: [],
	ignoreScripts: [],
};

export const PROJECT_NAME = "scriptlint";

export const NAME_REGEX = /^[\d:A-Za-z]+$/;

export const NAMESPACES = [
	"build",
	"dev",
	"lint",
	"format",
	"lint",
	"other",
	"report",
	"script",
	"setup",
	"start",
	"test",
];

export const DEFAULT_NPM_HOOKS = [
	"install",
	"postinstall",
	"postpack",
	"postpublish",
	"postrestart",
	"postshrinkwrap",
	"poststart",
	"poststop",
	"posttest",
	"postuninstall",
	"postversion",
	"preinstall",
	"precommit",
	"prepack",
	"prepare",
	"prepublish",
	"prepublishOnly",
	"prerestart",
	"preshrinkwrap",
	"prestart",
	"prestop",
	"pretest",
	"preuninstall",
	"preversion",
	"publish",
	"release",
	"restart",
	"shrinkwrap",
	"stop",
	"uninstall",
	"version",
];
