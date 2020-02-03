import mockConsole from "jest-mock-console";
import {dump, error, warning, success} from "./cliReporter";

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
		// eslint-disable-next-line no-console
		expect(console.log).toHaveBeenCalled();
		restoreConsole();
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
