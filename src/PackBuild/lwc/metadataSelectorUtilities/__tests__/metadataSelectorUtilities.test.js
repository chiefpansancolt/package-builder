import { CONSTANTS, copy } from 'c/metadataSelectorUtilities';

const mockClipboard = {
	writeText: jest.fn().mockResolvedValue(undefined)
};
Object.defineProperty(navigator, 'clipboard', {
	value: mockClipboard,
	configurable: true
});

const originalConsoleError = console.error;
beforeEach(() => {
	console.error = jest.fn();
});
afterEach(() => {
	console.error = originalConsoleError;
});

describe('CONSTANTS', () => {
	it('should have the correct API version', () => {
		expect(CONSTANTS.APIVERSION).toBe('62.0');
	});

	it('should have the correct ICONS', () => {
		expect(CONSTANTS.ICONS).toEqual({
			METADATATYPE: 'custom:custom63',
			METADATALIST: 'standard:related_list',
			PACKAGE: 'standard:file',
			SFDX: 'standard:file'
		});
	});

	it('should have the correct BLANK value', () => {
		expect(CONSTANTS.BLANK).toBe('');
	});

	it('should have the correct DEFAULT_MESSAGE', () => {
		expect(CONSTANTS.DEFAULT_MESSAGE).toBe('Message');
	});

	it('should have the correct VARIANTOPTIONS', () => {
		expect(CONSTANTS.VARIANTOPTIONS).toEqual([
			{ label: 'Error', value: 'error' },
			{ label: 'Warning', value: 'warning' },
			{ label: 'Success', value: 'success' },
			{ label: 'Info', value: 'info' }
		]);
	});
});

describe('copy function', () => {
	it('should call navigator.clipboard.writeText with the correct text', async () => {
		const testText = 'Text to copy';
		await copy(testText);

		expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
		expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testText);
	});

	it('should handle clipboard API errors', async () => {
		const mockError = new Error('Clipboard error');
		navigator.clipboard.writeText.mockRejectedValueOnce(mockError);

		const testText = 'Text that fails to copy';
		await copy(testText);

		expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
		expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testText);
		expect(console.error).toHaveBeenCalledTimes(1);
		expect(console.error).toHaveBeenCalledWith(JSON.stringify(mockError));
	});
});
