/* eslint-disable no-console */
import { mockProcessExit } from "jest-mock-process";
import mockConsole from "jest-mock-console";
import { cliRun } from "../src/cli";

jest.mock("fs");
jest.mock("path");
const mockExit = mockProcessExit();

let restoreConsole: any;
let processArgv: Array<string>;

beforeAll(() => {
	processArgv = process.argv;
});

beforeEach(() => {
	restoreConsole = mockConsole();
});

afterAll(() => {
	mockExit.mockRestore();
	if (restoreConsole) {
		restoreConsole();
	}
});

describe("cli.ts", () => {
	it("should lint files", () => {
		process.argv = [...processArgv, "real/existing/path/package.json"];
		cliRun();

		expect((console.log as any).mock.calls.length).toEqual(3);

		expect(mockExit).toHaveBeenCalledWith(1);
	});

	it("should fix 1 issue", () => {
		process.argv = [
			...processArgv,
			"real/existing/path/fixable/package.json",
			"--fix"
		];
		cliRun();

		expect((console.log as any).mock.calls[0][0]).toMatch(/Fixed 1 issue/);
	});

	it("should fix 2 issues", () => {
		process.argv = [
			...processArgv,
			"real/existing/path/fixable2/package.json",
			"--fix"
		];
		cliRun();

		expect((console.log as any).mock.calls[0][0]).toMatch(/Fixed 2 issues/);
	});

	it("should be all good man", () => {
		process.argv = [
			...processArgv,
			"real/existing/path/correct/package.json",
			"--fix"
		];
		cliRun();

		expect((console.log as any).mock.calls[0][0]).toMatch(/All good/);

		expect(mockExit).toHaveBeenCalledWith(0);
	});

	it("prints --json", () => {
		process.argv = [
			...processArgv,
			"real/existing/path/package.json",
			"--json"
		];
		cliRun();

		const calls = (console.log as any).mock.calls;

		expect(calls.length).toEqual(1);
		expect(JSON.parse(calls[0]).length).toEqual(3);
	});

	it("prints --config", () => {
		process.argv = [
			...processArgv,
			"real/existing/path/package.json",
			"--config"
		];
		cliRun();

		const calls = (console.log as any).mock.calls;

		expect(JSON.parse(calls[0]).customRules).toEqual([]);
	});
});
