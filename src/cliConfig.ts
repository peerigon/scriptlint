import commander from "commander";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require("../package.json");

type CliConfig = {
	packageFile?: string;
	fix?: boolean;
	strict?: boolean;
	json?: boolean;
	config?: boolean;
};

export default (argv: Array<string>): CliConfig => {
	const program = new commander.Command();
	let packageFile;

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

	const options = program.opts();

	const cliConfig: CliConfig = { packageFile };

	if (options.fix !== undefined) {
		cliConfig.fix = options.fix;
	}

	if (options.strict !== undefined) {
		cliConfig.strict = options.strict;
	}

	if (options.json !== undefined) {
		cliConfig.json = options.json;
	}

	if (options.config !== undefined) {
		cliConfig.config = options.config;
	}

	return cliConfig;
};
