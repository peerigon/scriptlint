export type Rule = {
	isObjectRule: boolean;
	name: string;
	message: string;
	validate: unknown;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fix?: (a: unknown, b?: unknown, c?: unknown) => PackageScripts & [string, string];
};

export type PackageScripts = {
	[key: string]: string;
};

export type Config = {
	strict: boolean;
	fix: boolean;
	rules: {
		[key: string]: boolean;
	};
	customRules: Array<Rule>;
	ignoreScripts: Array<string>;
};

export type RulesConfig = {
	[key: string]: boolean;
};

export type PackageFile = {
	[key: string]: unknown;
	scripts: PackageScripts;
};
