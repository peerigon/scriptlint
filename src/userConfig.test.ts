import loadConfig, {sanitizeConfig, defaultConfig} from "./userConfig";

const validConfig = {
	extends: ["foo"],
	rules: {foo: "bar"},
	ignoreScripts: ["foo"],
};

const invalidConfig = {
	invalid: 3,
};

describe("reporter.ts", () => {
	it("should sanitize configs: empty config => default", () => {
		expect(sanitizeConfig({})).toEqual(defaultConfig);
	});
	it("should sanitize configs: null => default", () => {
		expect(sanitizeConfig(null)).toEqual(defaultConfig);
	});
	it("should sanitize configs: invalid keys", () => {
		expect(sanitizeConfig(invalidConfig)).toEqual(defaultConfig);
	});
	it("should sanitize configs: valid => valid", () => {
		expect(sanitizeConfig(validConfig)).toEqual(validConfig);
	});
	it("should sanitize configs: extends not empty", () => {
		expect(sanitizeConfig({
			extends: [],
			rules: {foo: "bar"},
		})).toEqual({
			...defaultConfig,
			rules: {foo: "bar"},
		});
	});

	test("loadConfig()", () => {
		const loaded = loadConfig();

		expect(loaded).toMatchSnapshot();
	});

	test("loadConfig() with config missing", () => {
		const loaded = loadConfig("missing");

		expect(loaded).toBe(defaultConfig);
	});
});

export {};
