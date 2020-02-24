import execute from "../src/execute";
import { loadRulesFromRuleConfig } from "../src/loadRules";
import { ValidationFunctionInvalidError } from "../src/errors";

const rulesNonStrict = loadRulesFromRuleConfig(false);
const rulesStrict = loadRulesFromRuleConfig(true);

describe("execute.ts", () => {
	it("errors by default on empty scripts", () => {
		const [issues, fixed] = execute(rulesNonStrict, {});

		expect(fixed).toEqual({});
		expect(issues.map(i => i.name)).toEqual([
			"mandatory-test",
			"mandatory-start",
			"mandatory-dev"
		]);
	});

	describe("errors for invalid validation functions", () => {
		const rules = [
			{
				isObjectRule: true,
				name: "foo",
				message: "bar",
				validate: "unknown"
			}
		];

		const scripts = {
			foo: "bar"
		};

		test("object rule", () => {
			expect(() => {
				execute(rules, scripts);
			}).toThrowError(ValidationFunctionInvalidError);
		});

		test("entry rule", () => {
			rules[0].isObjectRule = false;
			expect(() => {
				execute(rules, scripts);
			}).toThrowError(ValidationFunctionInvalidError);
		});
	});

	it("doesn't complain about correct scripts (default, fixing)", () => {
		const scripts = {
			dev: "echo 1",
			start: "echo 1",
			test: "echo 1"
		};

		const [issues, fixed] = execute(
			rulesNonStrict,
			scripts,
			() => {},
			true
		);

		expect(fixed).toEqual(scripts);
		expect(issues).toEqual([]);
	});

	it("complains about rule violations (strict) #1", () => {
		const [issues] = execute(rulesStrict, {
			foo: "echo 1"
		});

		expect(issues.map(i => i.name)).toEqual([
			"mandatory-test",
			"mandatory-start",
			"mandatory-dev",
			"uses-allowed-namespace"
		]);
	});

	it("complains about rule violations (strict) #2", () => {
		const mockWarningFn = jest.fn();

		const [issues] = execute(
			rulesStrict,
			{
				dev: "echo 1",
				start: "echo 1",
				test: "echo 1",
				"preother:foobar": "echo 1"
			},
			mockWarningFn
		);

		expect(issues.map(i => i.name)).toEqual([
			"prepost-trigger-defined",
			"alphabetic-order"
		]);
		expect(mockWarningFn).toHaveBeenCalled();
	});

	it("complains about rule violations (strict, fixed) #3", () => {
		const scripts = {
			"wrong-place-no-category-wrong-case": "echo 1",
			dev: "echo 1",
			start: "echo 1",
			test: "echo 1"
		};

		const fixedShouldBe = {
			dev: "echo 1",
			"other:wrong-place-no-category-wrong-case": "echo 1",
			start: "echo 1",
			test: "echo 1"
		};

		const mockWarningFn = jest.fn();
		const [issues, fixed] = execute(
			rulesStrict,
			scripts,
			mockWarningFn,
			true
		);

		expect(mockWarningFn).toHaveBeenCalled();
		expect(issues.map(i => i.name)).toEqual(["correct-casing"]);

		expect(fixed).toEqual(fixedShouldBe);

		expect(Object.keys(fixed).join(", ")).toEqual(
			Object.keys(fixedShouldBe).join(", ")
		);
	});

	it("doesn't complain about correct scripts (default)", () => {
		const [issues] = execute(rulesStrict, {
			dev: "echo 1",
			prepublishOnly: "echo 1",
			start: "echo 1",
			test: "echo 1"
		});

		expect(issues).toEqual([]);
	});
});

export {};
