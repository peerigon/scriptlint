import {filterPackageScriptsByKeys} from "./userPackageScripts";

describe("userPackageScripts.ts", () => {
	it("filters objects by keys correctly", () => {
		expect(filterPackageScriptsByKeys({foo: "echo 1", bar: "echo 2", baz: "echo 3"}, ["bar"])).toEqual({
			baz: "echo 3",
			foo: "echo 1",
		});
	});
	it("filters objects by keys correctly", () => {
		expect(filterPackageScriptsByKeys({foo: "echo 1"}, [])).toEqual({
			foo: "echo 1",
		});
	});
	it("filters objects by keys correctly", () => {
		expect(filterPackageScriptsByKeys({}, [])).toEqual({});
	});
});
