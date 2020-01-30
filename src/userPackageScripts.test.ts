import userPackageScripts, {
	readPackageScripts,
	writePackageScripts,
} from "./userPackageScripts";

const setMock = jest.fn();
const saveMock = jest.fn();

jest.mock("./editJson", () => () => ({
	get: () => ({
		scripts: {
			foo: "bar",
		},
	}),
	set: (path: string, content: Record<string, unknown>) =>
		setMock(path, content),
	save: () => saveMock(),
}));

describe("userPackageScripts.ts", () => {
	it("reads package.json files", () => {
		const thisPackageJson = userPackageScripts([]);

		expect(Object.keys(thisPackageJson).length > 0).toBe(true);
	});

	it("fails when it no package.json was found", () => {
		try {
			readPackageScripts([]);

			expect(true).toBe(false);
		} catch (e) {
			expect(e.message).toBeDefined();
		}
	});

	it("fails when package.json has no scripts", () => {
		try {
			readPackageScripts([]);

			expect(true).toBe(false);
		} catch (e) {
			expect(e.message).toBeDefined();
		}
	});

	it("writes back to the file", () => {
		writePackageScripts({
			foo: "bar",
		});
		expect(setMock).toHaveBeenCalledWith("scripts", {
			foo: "bar",
		});
		expect(saveMock).toHaveBeenCalled();
	});
});
