import {Values, MessageType} from "./types";
import {makeMessage} from "./utils";

type JsonMessage = {
	type: string;
	message: string;
	affected: Values;
};

type JsonMessageBuffer = Array<JsonMessage>;

const stashed: JsonMessageBuffer = [];

const stash = (message: string, type: MessageType, values?: Values): void => {
	stashed.push({
		message,
		type,
		affected: values,
	});
};

export default {
	warning: (template: string, values?: Values): void => {
		const message = makeMessage(template, values);

		stash(message, "warning", values);
	},
	success: (): void => {},

	dump: (): number => {
		const problemCount = stashed.length;

		// eslint-disable-next-line no-console
		console.log(JSON.stringify(stashed, null, 2));

		return problemCount;
	},
};
