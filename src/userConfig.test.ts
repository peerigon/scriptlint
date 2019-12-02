import {sanitizeConfig, defaultConfig} from "./userConfig";

const validConfig = {
	extends: ["foo"],
	rules: {foo: "bar"},
	ignoreScripts: ["foo"],
};

describe("reporter.ts", () => {
	it("should sanitize configs", () => {
		expect(sanitizeConfig({})).toEqual(defaultConfig);
		expect(sanitizeConfig(null)).toEqual(defaultConfig);
		expect(sanitizeConfig(validConfig)).toEqual(validConfig);
	});
});

export {};
