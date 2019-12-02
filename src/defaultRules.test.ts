import defaultRules from "./defaultRules";
import defaultRuleSets from "./defaultRuleSets";
import {getRuleByName} from "./rules";

describe("defaultRuleSets.ts", () => {
	it("should sanitize configs", () => {
		expect(defaultRuleSets.strict.length).toEqual(defaultRules.length);
	});
});

const maybeTestValidationFn = (name: string, cb: any) => {
	const rule = getRuleByName(defaultRules, name);

	if (rule && rule.validate && typeof rule.validate === "function") {
		test(name, () => cb(rule.validate));
	}
};

describe("defaultRules.ts", () => {
	maybeTestValidationFn("no-default-test", (validate: any) => {
		expect(validate({})).toBe(true);
		expect(
			validate({
				test: "echo 1",
			})
		).toBe(true);
		expect(
			validate({
				test: 'echo "Error: no test specified" && exit 1',
			})
		).toBe(false);
	});

	maybeTestValidationFn("mandatory-test", (validate: any) => {
		expect(
			validate({
				test: "echo 1",
			})
		).toBe(true);
		expect(
			validate({
				foo: "echo 1",
			})
		).toBe(false);
	});

	maybeTestValidationFn("correct-casing", (validate: any) => {
		expect(validate("foobar")).toBe(true);
		expect(validate("foo:bar")).toBe(true);
		expect(validate("fooBar")).toBe(true);
		expect(validate("foo-bar")).toBe(false);
		expect(validate("foo_bar")).toBe(false);
		expect(validate("foo-Bar")).toBe(false);
	});

	maybeTestValidationFn("uses-allowed-namespace", (validate: any) => {
		expect(validate("dev:foobar")).toBe(true);
		expect(validate("other:foobar")).toBe(true);
		expect(validate("foobar:barfoo")).toBe(false);
		expect(validate("foobar")).toBe(false);
	});

	maybeTestValidationFn("prepost-trigger-defined", (validate: any) => {
		expect(validate({})).toBe(true);
		expect(
			validate({
				prefoo: "echo 1",
				foo: "echo 1",
			})
		).toBe(true);
		expect(
			validate({
				prefoo: "echo 1",
			})
		).toEqual(["foo"]);
	});
});

export {};
