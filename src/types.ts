export type Rule = {
	isObjectRule: boolean;
	name: string;
	message: string;
	validate: unknown;
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
