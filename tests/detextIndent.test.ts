import fs from "fs";
import { detectIndent } from "../src/detectIndent";

const packageJson = fs.readFileSync("./package.json");
const editorConfigYaml = fs.readFileSync("./.editorconfig");

describe("detectIndent.test.ts", () => {
	it("should detect indentation", () => {
		expect(
			detectIndent(`foo
	bar
		baz
	boo`)
		).toEqual({ amount: 1, indent: "\t", type: "tab" });

		expect(
			detectIndent(`const search = () => {
  return {
    config: {
      strict: true,
    }
  };
};`)
		).toEqual({ amount: 2, indent: "  ", type: "space" });

		expect(
			detectIndent(`const search = () => {
    return {
        config: {
            strict: true,
        }
    };
};`)
		).toEqual({ amount: 4, indent: "    ", type: "space" });

		expect(detectIndent(packageJson.toString())).toEqual({
			amount: 1,
			indent: "\t",
			type: "tab",
		});

		expect(detectIndent(editorConfigYaml.toString())).toEqual({
			amount: 0,
			indent: "",
			type: undefined,
		});
	});
});
