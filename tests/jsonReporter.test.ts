import mockConsole from "jest-mock-console";
import makeReporter from "../src/reporters";

const {warning, dump, success, get} = makeReporter("json");

describe("reporter.ts", () => {
	test("should console.log", () => {
		warning("foo");
		warning("foo");
		warning("foo");
		expect(get()).toEqual([
			{affected: undefined, message: "foo", type: "warning"},
			{affected: undefined, message: "foo", type: "warning"},
			{affected: undefined, message: "foo", type: "warning"},
		]);
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
