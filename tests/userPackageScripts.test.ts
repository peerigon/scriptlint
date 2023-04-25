import context from "../src/userPackageScripts";

const { readPackageScripts, writePackageScripts } = context(
	"real/existing/path/package.json"
);

const setMock = jest.fn();
const saveMock = jest.fn();

jest.mock("../src/editJson", () =>
	jest.fn(() => ({
		get: () => ({
			scripts: {
				foo: "bar",
			},
		}),
		set: (path: string, content: Record<string, unknown>) =>
			setMock(path, content),
		save: () => saveMock(),
	}))
);

describe("userPackageScripts.ts", () => {
	it("reads package.json files", () => {
		const thisPackageJson = readPackageScripts([]);

		expect(Object.keys(thisPackageJson).length > 0).toBe(true);
	});

	it("fails when it no package.json was found", () => {
		try {
			readPackageScripts([]);

			expect(true).toBe(false);
		} catch (e) {
			expect((e as Error).message).toBeDefined();
		}
	});

	it("fails when package.json has no scripts", () => {
		try {
			readPackageScripts([]);

			expect(true).toBe(false);
		} catch (e) {
			expect((e as Error).message).toBeDefined();
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
