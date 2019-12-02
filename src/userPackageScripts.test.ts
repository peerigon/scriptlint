import userPackageScripts, {
	filterPackageScriptsByKeys,
} from "./userPackageScripts";

describe("userPackageScripts.ts", () => {
	it("reads package.json files", () => {
		const thisPackageJson = userPackageScripts([]);

		expect(Object.keys(thisPackageJson).length > 0).toBe(true);
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
