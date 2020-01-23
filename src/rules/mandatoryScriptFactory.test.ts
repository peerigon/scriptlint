import factory from "./mandatoryScriptFactory";

describe("mandatoryScriptFactory.ts", () => {
	it("should validate correctly", () => {
		const rule = factory("dev");
		const validate = rule.validate;

		if (typeof validate !== "function") {
			return;
		}

		expect(
			validate({
				foo: "bar",
			})
		).toBe(false);

		expect(
			validate({
				dev: "bar",
			})
		).toBe(true);
	});
});
