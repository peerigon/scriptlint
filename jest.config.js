"use strict";

module.exports = {
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	testURL: "http://localhost",
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	modulePathIgnorePatterns: ["out-ts", "dist"],
	setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
	collectCoverageFrom: ["src/**/*.ts", "!src/index.ts"]
};
