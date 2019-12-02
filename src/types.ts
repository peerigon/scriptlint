export type Rule = {
	isObjectRule: boolean;
	name: string;
	message: string;
	validate: unknown;
};

export type PackageScripts = {
	[key: string]: unknown;
};
