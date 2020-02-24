export class ConfigError extends Error {
	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, ConfigError.prototype);
	}
}

export class ValidationFunctionInvalidError extends Error {
	constructor(name: string) {
		super(`Rule validation function is not a function (${name})`);
		Object.setPrototypeOf(this, ValidationFunctionInvalidError.prototype);
	}
}

export class PackageFileNotFoundError extends Error {
	constructor(path: string) {
		super("package.json could not be found at this location: " + path);
		Object.setPrototypeOf(this, PackageFileNotFoundError.prototype);
	}
}
