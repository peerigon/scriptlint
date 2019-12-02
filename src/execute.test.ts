import execute from "./execute";
import {PROJECT_NAME} from "./constants";
import {loadRulesFromRuleConfig} from "./rules";

const rulesNonStrict = loadRulesFromRuleConfig([PROJECT_NAME + "/default"]);
const rulesStrict = loadRulesFromRuleConfig([PROJECT_NAME + "/strict"]);

describe("execute.ts", () => {
	it("errors by default on empty scripts", () => {
		const executed = execute(rulesNonStrict, {});

		expect(executed).toEqual(["mandatory-test", "mandatory-start", "mandatory-dev"]);
	});

	it("doesn't complain about correct scripts (default)", () => {
		const executed2 = execute(rulesNonStrict, {
			dev: "echo 1",
			start: "echo 1",
			test: "echo 1",
		});

		expect(executed2).toEqual([]);
	});

	it("complains about rule violations (strict)", () => {
		const executed2 = execute(rulesStrict, {
			foo: "echo 1",
		});

		expect(executed2).toEqual(["mandatory-test", "mandatory-start", "mandatory-dev", "uses-allowed-namespace (foo)"]);
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
