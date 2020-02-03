import commander from "commander";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {version} = require("../package.json");

type CliConfig = {
	fix?: boolean;
	strict?: boolean;
};

export default (argv: Array<string>): CliConfig => {
	const program = new commander.Command();

	program
		.version(`${version}`)
		.option("-s, --strict", "strict mode")
		.option("-f, --fix", "autofixing");

	program.parse(argv);

	const cliConfig: CliConfig = {};

	if (program.fix !== undefined) {
		cliConfig.fix = program.fix;
	}

	if (program.strict !== undefined) {
		cliConfig.strict = program.strict;
	}

	return cliConfig;
};
