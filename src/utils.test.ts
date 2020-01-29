import {slugify} from "./utils";

describe("slugify()", () => {
	it("should leave empty strings alone", () => {
		expect(slugify("")).toEqual("");
	});

	it("should already slugged strings alone", () => {
		expect(slugify("this-is-fine")).toEqual("this-is-fine");
	});

	it("should lowercase some stuff", () => {
		expect(slugify("LOWERCASE-THIS")).toEqual("lowercase-this");
	});

	it("should sluggify correctly 1", () => {
		expect(slugify("this is NOT cool! ")).toEqual("this-is-not-cool");
	});

	it("should sluggify correctly 2", () => {
		expect(slugify("!APPARENTLY\tSOMETHING WENT 🚨 WRONG!")).toEqual("apparently-something-went-wrong");
	});

	it("should sluggify correctly 3", () => {
		expect(slugify("rm -rf")).toEqual("rm-rf");
	});

	it("should sluggify correctly 4", () => {
		expect(slugify("unix-operators (&)")).toEqual("unix-operators");
	});
});
