import loadConfig, {sanitizeConfig, defaultConfig} from "./userConfig";

const validConfig = {
	strict: true,
	fix: false,
	json: false,
	rules: {foo: "bar"},
	ignoreScripts: ["foo"],
	customRules: [
		{
			isObjectRule: false,
			name: "foobar",
			message: "barbaz",
			validate: () => true,
		},
	],
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
