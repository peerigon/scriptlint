import execute from "./execute";
import {PROJECT_NAME} from "./constants";
import {loadRulesFromRuleConfig} from "./rules";

const rulesNonStrict = loadRulesFromRuleConfig([PROJECT_NAME + "/default"]);
const rulesStrict = loadRulesFromRuleConfig([PROJECT_NAME + "/strict"]);

describe("execute.ts", () => {
	it("errors by default on empty scripts", () => {
		const executed = execute(rulesNonStrict, {});

		expect(executed).toBe(true);
	});

	it("doesn't complain about correct scripts (default)", () => {
		const executed2 = execute(rulesNonStrict, {
			dev: "echo 1",
			start: "echo 1",
			test: "echo 1",
		});

		expect(executed2).toBe(false);
	});

	it("complains about rule violations (strict)", () => {
		const executed2 = execute(rulesStrict, {
			foo: "echo 1",
		});

		expect(executed2).toBe(true);
	});

	it("doesn't complain about correct scripts (default)", () => {
		const executed2 = execute(rulesStrict, {
			dev: "echo 1",
			start: "echo 1",
			test: "echo 1",
		});

		expect(executed2).toBe(false);
	});
});

export {};
