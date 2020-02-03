import chalk from "chalk";

const PREFIX = "𝖘";

type MessageType = "error" | "warning" | "success";

type Message = {
	message: string;
	type: MessageType;
};

type MessageBuffer = Array<Message>;

export type Values =
	| undefined
	| {
			[key: string]: string;
	};

export const makeMessage = (template: string, values: Values): string => {
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
		message,
		type,
	});
};

export default (reporterType: "cli" | "json") => {
	return {
		warning: (template: string, values?: Values): void => {
			const message = makeMessage(template, values);

			stash(message, "warning");
		},
		success: (template: string, values?: Values): void => {
			const message = makeMessage(template, values);

			stash(message, "success");
		},

		dump: (): number => {
			const problemCount = stashed.length;

			stashed.forEach(({message, type}) => {
				print(type, message);
			});

			stashed = [];

			return problemCount;
		},
	};
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
