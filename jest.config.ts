import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "node",
	modulePathIgnorePatterns: ["out-ts", "dist"],
	setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
	transformIgnorePatterns: [],
	collectCoverageFrom: [
		"src/**/*.ts",
		"!src/index.ts",
		"!src/cli.ts",
		"!src/errors.ts",
	],
};

export default config;
