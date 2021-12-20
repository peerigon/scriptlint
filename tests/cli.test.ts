/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */
import mockConsole from "jest-mock-console";
import cli from "../src/cliModule";

jest.mock("fs");
jest.mock("path");

let restoreConsole: any;
const processArgv = [process.argv[0], process.argv[1]];

beforeEach(() => {
	restoreConsole = mockConsole();
});

afterAll(() => {
	if (restoreConsole) {
		restoreConsole();
	}
});

describe("cli.ts", () => {
	it("should lint files", () => {
		cli([...processArgv, "real/existing/path/package.json"]);

		expect((console.log as any).mock.calls.length).toEqual(3);
	});

	it("should catch errors", () => {
		expect(() => {
			cli([...processArgv, "not/existing/package.json"]);
		}).not.toThrow();
	});

	it("should fix 1 issue", () => {
		cli([
			...processArgv,
			"real/existing/path/fixable/package.json",
			"--fix",
		]);

		expect((console.log as any).mock.calls[0][0]).toMatch(/Fixed 1 issue/);
	});

	it("should fix 2 issues", () => {
		cli([
			...processArgv,
			"real/existing/path/fixable2/package.json",
			"--fix",
		]);

		expect((console.log as any).mock.calls[0][0]).toMatch(/Fixed 2 issues/);
	});

	it("should be all good man", () => {
		cli([
			...processArgv,
			"real/existing/path/correct/package.json",
			"--fix",
		]);

		expect((console.log as any).mock.calls[0][0]).toMatch(/All good/);
	});

	it("prints --json", () => {
		cli([...processArgv, "real/existing/path/package.json", "--json"]);

		const calls = (console.log as any).mock.calls;

		expect(calls.length).toEqual(1);
		expect(JSON.parse(calls[0]).length).toEqual(3);
	});

	it("prints --config", () => {
		cli([...processArgv, "real/existing/path/package.json", "--config"]);

		const calls = (console.log as any).mock.calls;

		expect(JSON.parse(calls[0]).customRules).toEqual([]);
	});
});
