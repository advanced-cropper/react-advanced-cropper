/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	clearMocks: true,
	testEnvironment: 'jest-environment-jsdom',
	testEnvironmentOptions: { resources: "usable" }
};
