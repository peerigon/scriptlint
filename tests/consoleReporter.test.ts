import mockConsole from "jest-mock-console";
import { warning, dump, success, error } from "../src/consoleReporter";

describe("consoleReporter.ts", () => {
	test("should console.log", () => {
		warning("foo");
		warning("foo");
		warning("foo");

		expect(dump(false)).toBe(3);
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
		dump(false);
		// eslint-disable-next-line no-console
		expect(console.log).toHaveBeenCalled();
		restoreConsole();
	});
});
