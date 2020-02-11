import mockConsole from "jest-mock-console";
import {error} from "../src/consoleReporter";
import makeReporter from "../src/reporters";

const {warning, dump, success, get} = makeReporter("console.log");

describe("reporter.ts", () => {
	test("should console.log", () => {
		warning("foo");
		warning("foo");
		warning("foo");
		expect(get()).toEqual([
			{message: "foo", type: "warning"},
			{message: "foo", type: "warning"},
			{message: "foo", type: "warning"},
		]);
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
