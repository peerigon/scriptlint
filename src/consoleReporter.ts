import chalk from "chalk";
import { Values, MessageBuffer, MessageType } from "./types";
import { makeMessage } from "./utils";

const PREFIX = "⧙։⧘";
let stashed: MessageBuffer = [];

const stash = (message: string, type: MessageType): void => {
	stashed.push({
		message,
		type
	});
};

export const warning = (template: string, values?: Values): void => {
	const message = makeMessage(template, values);

	stash(message, "warning");
};

export const success = (template: string, values?: Values): void => {
	const message = makeMessage(template, values);

	stash(message, "success");
};

export const dump = (jsonOutput: boolean): number => {
	const problemCount = stashed.length;

	if (jsonOutput) {
		// eslint-disable-next-line no-console
		console.log(JSON.stringify(stashed, null, "\t"));
	} else {
		stashed.forEach(({ message, type }) => {
			print(type, message);
		});
	}

	stashed = [];

	return problemCount;
};

export const error = (message: string): void => {
	print("error", message);
};

const print = (type: MessageType, message: string) => {
	switch (type) {
	case "error": {
		// eslint-disable-next-line no-console
		console.log(chalk.bold.red(`${PREFIX} [error] ${message}`));
		break;
	}

	case "warning": {
		const notUnderlined = chalk.yellow.bold(`${PREFIX} [${type}]`);
		const underlined = chalk.yellow.underline(message);

		// eslint-disable-next-line no-console
		console.log(`${notUnderlined} ${underlined}`);
		break;
	}
	case "success": {
		// eslint-disable-next-line no-console
		console.log(chalk.bold.gray(`${PREFIX} [✔️] ${message}`));
		break;
	}
	}
};
