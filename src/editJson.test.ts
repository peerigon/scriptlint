import detectIndent from "detect-indent";
import EditJson from "./editJson";

jest.mock("fs");

describe("editJson.ts", () => {
	describe("it throws on file not found", () => {
		expect(() => new EditJson("foo/bar/baz")).toThrow();
	});

	const file = new EditJson("real/existing/path/package.json");

	it("reads files", () => {
		expect(file).toMatchSnapshot();
	});

	it("creates files", () => {
		expect(file).toMatchSnapshot();
	});

	test("get()", () => {
		expect(file.get()).toEqual({scripts: {foo: "bar"}});
	});

	test("set()", () => {
		expect(file.set("scripts", {foo: "bar"}).get()).toEqual({
			scripts: {foo: "bar"},
		});
	});

	it("should preserve indentation", () => {
		expect(file.indent).toEqual({amount: 2, indent: "  ", type: "space"});
	});

	const saved = file.save();

	test("save()", () => {
		expect((saved as any).written).toBe(true);
	});

	it("respects indentation 1", () => {
		expect(detectIndent((saved as any).content).type).toEqual("space");
	});

	it("respects indentation 2", () => {
		const file2 = new EditJson("real/existing/path/package-with-tabs.json");

		file2.set("scripts", {foo: "bar"});
		const saved2 = file2.save();

		expect(detectIndent((saved2 as any).content).type).toEqual("tab");
	});
});

export {};
