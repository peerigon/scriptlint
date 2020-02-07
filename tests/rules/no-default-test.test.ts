import rule from "../../src/rules/no-default-test";

describe("no-default-test.ts", () => {
	it("should validate correctly", () => {
		expect(rule.validate({})).toBe(true);
		expect(
			rule.validate({
				test: "echo 1",
			})
		).toBe(true);
		expect(
			rule.validate({
				test: 'echo "Error: no test specified" && exit 1',
			})
		).toBe(false);
	});
});
