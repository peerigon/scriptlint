export type Indent = {
	type: "tab" | "space" | undefined;
	amount: number;
	indent: string;
};

export const detectIndent = (fileContents: string) => {
	const lineBeginnings = fileContents.split("\n").map((line) => {
		const noSpace = line.trimStart();
		const onlySpace = line.replace(noSpace, "");

		return onlySpace;
	});

	const indentsOnly = lineBeginnings
		.reduce<Array<string>>((acc, line, index, arr) => {
			if (index < 1) return acc;
			const lastLine = arr[index - 1];

			if (lastLine.length < line.length) {
				acc.push(line);
			}

			return acc;
		}, [])
		.sort((a, b) => {
			return a.length - b.length;
		});

	if (indentsOnly.length === 0) {
		return { type: undefined, amount: 0, indent: "" };
	}

	const indent = indentsOnly[0];
	const firstChar = indent.substring(0, 1);

	const type: Indent["type"] = (() => {
		if (firstChar === " ") {
			return "space";
		}
		if (firstChar === "\t") {
			return "tab";
		}

		return undefined;
	})();

	const amount = indent.length;

	return { type, indent, amount };
};
