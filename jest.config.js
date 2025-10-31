const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

module.exports = {
	...jestConfig,
	testPathIgnorePatterns: [
		'./spec/',
		'__tests__/data/',
	],
	moduleNameMapper: {
		'^lightning/platformShowToastEvent$': '<rootDir>/test/jest-mocks/lightning/platformShowToastEvent'
	},
	clearMocks: true
};
