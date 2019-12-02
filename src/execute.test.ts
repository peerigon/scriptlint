import execute from "./execute";
import {PROJECT_NAME} from "./constants";
import {loadRulesFromRuleConfig} from "./rules";

const rulesNonStrict = loadRulesFromRuleConfig([PROJECT_NAME + "/default"]);

describe("execute.ts", () => {
	it("errors by default on empty scripts", () => {
		const executed = execute(rulesNonStrict, {});

		expect(executed).toBe(true);
	});

	it("honors default rules", () => {
		const executed2 = execute(rulesNonStrict, {
			dev: "echo 1",
			start: "echo 1",
			test: "echo 1",
		});

		expect(executed2).toBe(false);
	});
});

export {};
