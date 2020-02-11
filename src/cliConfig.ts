import commander from "commander";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {version} = require("../package.json");

type CliConfig = {
	packageFile: string;
	fix?: boolean;
	strict?: boolean;
	json?: boolean;
	config?: boolean;
};

export default (argv: Array<string>): CliConfig => {
	const program = new commander.Command();
	let packageFile = "";

	program
		.version(`${version}`)
		.arguments("[packageFile]")
		.action((arg: string) => {
			packageFile = arg;
		})
		.option("-s, --strict", "strict mode")
		.option("-j, --json", "JSON output")
		.option("-c, --config", "inspect the config")
		.option("-f, --fix", "autofixing");

	program.parse(argv);

	const cliConfig: CliConfig = {packageFile};

	if (program.fix !== undefined) {
		cliConfig.fix = program.fix;
	}

	if (program.strict !== undefined) {
		cliConfig.strict = program.strict;
	}

	if (program.json !== undefined) {
		cliConfig.json = program.json;
	}

	if (program.config !== undefined) {
		cliConfig.config = program.config;
	}

	return cliConfig;
};
