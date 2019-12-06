import mockConsole from "jest-mock-console";
import {dump, error, warning} from "./reporter";

describe("reporter.ts", () => {
	test("should console.log", () => {
		warning("foo");
		warning("foo");
		warning("foo");
		expect(dump()).toBe(3);
	});

	test("error()", () => {
		const restoreConsole = mockConsole();

		error("foobar");
		expect(console.log).toHaveBeenCalled();
		restoreConsole();
	});
});
