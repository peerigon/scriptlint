import path from "path";
import userPackageScripts, {
	readPackageScripts,
	filterPackageScriptsByKeys,
} from "./userPackageScripts";

const testPJ = path.join(process.cwd(), "tests/invalid/");

describe("userPackageScripts.ts", () => {
	it("reads package.json files", () => {
		const thisPackageJson = userPackageScripts([]);

		expect(Object.keys(thisPackageJson).length > 0).toBe(true);
	});

	it("fails when it no package.json was found", () => {
		try {
			readPackageScripts("/dev/null", []);

			expect(true).toBe(false);
		} catch (e) {
			expect(e.message).toBeDefined();
		}
	});

	it("fails when package.json has no scripts", () => {
		try {
			readPackageScripts(testPJ, []);

			expect(true).toBe(false);
		} catch (e) {
			expect(e.message).toBeDefined();
		}
	});

	it("filters objects by keys correctly", () => {
		expect(
			filterPackageScriptsByKeys(
				{foo: "echo 1", bar: "echo 2", baz: "echo 3"},
				["bar"]
			)
		).toEqual({
			baz: "echo 3",
			foo: "echo 1",
		});
		expect(filterPackageScriptsByKeys({foo: "echo 1"}, [])).toEqual({
			foo: "echo 1",
		});
		expect(filterPackageScriptsByKeys({}, [])).toEqual({});
	});
});
