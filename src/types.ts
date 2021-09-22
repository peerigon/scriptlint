export type Rule = {
	isObjectRule: boolean;
	name: string;
	message: string;
	validate: unknown;

	fix?: (
		a: unknown,
		b?: unknown,
		c?: unknown
	) => PackageScripts & [string, string];
};

export type PackageScripts = {
	[key: string]: string;
};

export type Config = {
	strict: boolean;
	packageFile: string;
	packageScripts?: PackageScripts;
	fix: boolean;
	json: boolean;
	config: boolean;
	rules: {
		[key: string]: boolean;
	};
	customRules: Array<Rule>;
	ignoreScripts: Array<string>;
};

export type PackageFile = {
	[key: string]: unknown;
	scripts: PackageScripts;
};

export type Values =
	| undefined
	| string
	| Array<string>
	| {
			[key: string]: string;
	  };

export type MessageType = "error" | "warning" | "success";

type Message = {
	message: string;
	type: MessageType;
};

export type MessageBuffer = Array<Message>;

export type JsonMessage = {
	name: string;
	type: string;
	message: string;
	affected: Values;
};
