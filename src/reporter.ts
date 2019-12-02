import chalk from "chalk";

const PREFIX = "𝖘";

type MessageType = "error" | "warning";

type Message = {
	message: string;
	type: MessageType;
};

type MessageBuffer = Array<Message>;

type Values = {
	[key: string]: string;
} | undefined;

const makeMessage = (template: string, values: Values): string => {
	let message = template;

	if (values !== undefined) {
		const pairs = Object.entries(values);

		pairs.forEach(([key, value]) => {
			message = message.replace(`{{${key}}}`, value);
		});
	}

	return message;
};

let stashed: MessageBuffer = [];

const stash = (message: string, type: MessageType): void => {
	stashed.push({
		message, type,
	});
};

export const warning = (template: string, values?: Values): void => {
	const message = makeMessage(template, values);

	stash(message, "warning");
};

export const error = (template: string, values?: Values): void => {
	const message = makeMessage(template, values);

	stash(message, "error");
};

export const dump = (): number => {
	const problemCount = stashed.length;

	stashed.forEach(({message, type}) => {
		print(type, message);
	});

	stashed = [];

	return problemCount;
};

const print = (type: MessageType, message: string) => {
	const notUnderlined = `${PREFIX} [${type}]`;
	const underlined = chalk.underline(message);

	console.log(type === "error" ? chalk.red(`${notUnderlined} ${underlined}`) : `${notUnderlined} ${underlined}`);
};

