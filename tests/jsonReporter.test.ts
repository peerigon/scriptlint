import mockConsole from "jest-mock-console";
import makeReporter from "../src/reporters";

const {warning, dump, success} = makeReporter("json");

describe("reporter.ts", () => {
	test("should console.log", () => {
		warning("foo");
		warning("foo");
		warning("foo");
		expect(dump()).toBe(3);
	});

	test("success()", () => {
		const restoreConsole = mockConsole();

		success("foobar");
		dump();
		// eslint-disable-next-line no-console
		expect(console.log).toHaveBeenCalled();
		restoreConsole();
	});
});
