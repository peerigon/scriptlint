import factory from "./noShellSpecificsFactory";

describe("mandatoryScriptFactory.ts", () => {
	it("should validate correctly 1", () => {
		const rule = factory(/foobar/, "foobar", "barfoo");
		const validate = rule.validate;

		expect(typeof validate).toBe("function");

		if (typeof validate !== "function") {
			return;
		}

		expect(validate("scriptName123", "foobar --param 1 2 3")).toBe(false);

		expect(validate("scriptName123", "barfoo --param 1 2 3")).toBe(true);
	});

	it("should validate correctly 2", () => {
		const rule = factory(
			/ && /,
			"unix operators (&&)",
			"npm-run-all/run-s"
		);

		const validate = rule.validate;

		expect(typeof validate).toBe("function");

		if (typeof validate !== "function") {
			return;
		}

		expect(validate("scriptName123", "eslint && jest")).toBe(false);

		expect(validate("scriptName123", "run-s eslint jest")).toBe(true);
	});
});
