import cliConfig from "../src/cliConfig";

describe("cliConfig.ts", () => {
	it("should parse CLI params", () => {
		expect(cliConfig(["bar", "foo", "--strict", "--fix", "--json", "--config"])).toEqual({
			config: true,
			fix: true,
			json: true,
			strict: true,
		});
	});

	it("should parse CLI params #2", () => {
		expect(cliConfig(["foo", "bar", "--fix"])).toEqual({
			fix: true,
		});
	});

	it("should parse CLI params #2", () => {
		expect(cliConfig(["foo", "bar", "--strict"])).toEqual({
			strict: true,
		});
	});

	it("should parse CLI params #3", () => {
		expect(cliConfig(["foo", "bar"])).toEqual({});
	});
});
