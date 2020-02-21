import {DEFAULT_CONFIG} from "../src/constants";
import loadConfig, {sanitizeConfig} from "../src/userConfig";

const validConfig = {
	strict: true,
	fix: false,
	json: false,
	config: false,
	rules: { foo: "bar" },
	ignoreScripts: ["foo"],
	customRules: [
		{
			isObjectRule: false,
			name: "foobar",
			message: "barbaz",
			validate: () => true
		}
	]
};

const invalidConfig = {
	invalid: 3
};

describe("userConfig.ts", () => {
	it("should sanitize configs: empty config => default", () => {
		expect(sanitizeConfig({})).toEqual(DEFAULT_CONFIG);
	});
	it("should sanitize configs: null => default", () => {
		expect(sanitizeConfig(null)).toEqual(DEFAULT_CONFIG);
	});
	it("should sanitize configs: invalid keys", () => {
		expect(() => {
			sanitizeConfig(invalidConfig);
		}).toThrowErrorMatchingSnapshot();
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

		expect(loaded).toBe(DEFAULT_CONFIG);
	});
});

export {};
