import cliConfig from "../src/cliConfig";

describe("cliConfig.ts", () => {
	it("should parse CLI params", () => {
		const { packageFile, ...config } = cliConfig([
			"foo/bin/node",
			"/usr/local/bin/scriptlint",
			"-f",
			"--json",
			"foo/bar/baz",
			"--strict",
			"-c",
		]);

		expect(packageFile).toBe("foo/bar/baz");

		expect(config).toEqual({
			config: true,
			fix: true,
			json: true,
			strict: true,
		});
	});
	it("should parse CLI params #2", () => {
		const pJName = "foo/bar/baz/package.json";

		const { packageFile, ...config } = cliConfig([
			"foo/bin/node",
			"/usr/local/bin/scriptlint",
			"-f",
			"--json",
			"--strict",
			"-c",
			pJName,
		]);

		expect(packageFile).toBe(pJName);

		expect(config).toEqual({
			config: true,
			fix: true,
			json: true,
			strict: true,
		});
	});

	it("should parse CLI params #3", () => {
		const { packageFile, ...config } = cliConfig([
			"foo/bin/node",
			"/usr/local/bin/scriptlint",
			"-f",
		]);

		expect(packageFile).toEqual(process.cwd());

		expect(config).toEqual({
			fix: true,
		});
	});

	it("should parse CLI params #3", () => {
		const { packageFile, ...config } = cliConfig(["foo", "bar"]);

		expect(config).toEqual({});
	});
});
