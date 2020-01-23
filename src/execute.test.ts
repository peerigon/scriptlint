import execute from "./execute";
import {loadRulesFromRuleConfig} from "./rules";

const rulesNonStrict = loadRulesFromRuleConfig(false);
const rulesStrict = loadRulesFromRuleConfig(true);

describe("execute.ts", () => {
	it("errors by default on empty scripts", () => {
		const executed = execute(rulesNonStrict, {});

		expect(executed).toEqual([
			"mandatory-test",
			"mandatory-start",
			"mandatory-dev",
		]);
	});

	it("doesn't complain about correct scripts (default)", () => {
		const executed2 = execute(rulesNonStrict, {
			dev: "echo 1",
			start: "echo 1",
			test: "echo 1",
		});

		expect(executed2).toEqual([]);
	});

	it("complains about rule violations (strict) #1", () => {
		const executed2 = execute(rulesStrict, {
			foo: "echo 1",
		});

		expect(executed2).toEqual([
			"mandatory-test",
			"mandatory-start",
			"mandatory-dev",
			"uses-allowed-namespace (foo)",
		]);
	});

	it("complains about rule violations (strict) #2", () => {
		const executed2 = execute(rulesStrict, {
			dev: "echo 1",
			start: "echo 1",
			test: "echo 1",
			"preother:foobar": "echo 1",
		});

		expect(executed2).toEqual(["prepost-trigger-defined"]);
	});

	it("doesn't complain about correct scripts (default)", () => {
		const executed2 = execute(rulesStrict, {
			dev: "echo 1",
			start: "echo 1",
			test: "echo 1",
			prepublishOnly: "echo 1",
		});

		expect(executed2).toEqual([]);
	});
});

export {};
