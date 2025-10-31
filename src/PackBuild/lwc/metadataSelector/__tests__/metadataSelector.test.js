import { createElement, api } from 'lwc';
import MetadataSelector from 'c/metadataSelector';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import APIVERSION from '@salesforce/apex/MetadataUtility.APIVERSION';
import CLICOMMAND from '@salesforce/apex/MetadataUtility.CLICOMMAND';
import listMetadata from '@salesforce/apex/MetadataSelector.listMetadata';
import listFolders from '@salesforce/apex/MetadataSelector.listFolders';
import getMetadataTypes from '@salesforce/apex/MetadataUtility.getMetadataTypes';

jest.mock(
	'c/metadataSelectorTableColumns',
	() => ({
		MS_COLUMNS: [
			{ label: 'Name', fieldName: 'fullName', type: 'text' },
			{ label: 'Type', fieldName: 'type', type: 'text' }
		]
	}),
	{ virtual: true }
);

jest.mock(
	'c/metadataSelectorUtilities',
	() => ({
		CONSTANTS: {
			BLANK: '',
			ICONS: {
				METADATATYPE: 'custom:custom63',
				METADATALIST: 'standard:related_list',
				PACKAGE: 'standard:file',
				SFDX: 'standard:file'
			},
			VARIANTOPTIONS: [
				{ label: 'Error', value: 'error' },
				{ label: 'Warning', value: 'warning' },
				{ label: 'Success', value: 'success' },
				{ label: 'Info', value: 'info' }
			]
		}
	}),
	{ virtual: true }
);

jest.mock(
	'c/labelService',
	() => ({
		labels: {
			Metadata_Type_Selector: 'Metadata Type Selector',
			Results_Title: 'Results',
			Package_Title: 'Package',
			SFDX_Retrieve_Title: 'SFDX Retrieve',
			Copied_Button_Label: 'Copied!',
			Copy_Button_Label: 'Copy',
			Copy_All_Button_Label: 'Copy All',
			Copy_Types_Button_Label: 'Copy Types',
			Metadata_Retrieve_Error_Title: 'Error Retrieving Metadata',
			Metadata_Retrieve_Success_Title: 'Success',
			Metadata_Retrieve_Success_Message: 'Successfully retrieved metadata',
			Invalid_Metadata_Types: 'Invalid Metadata Type',
			Invalid_Package_Types: 'Invalid Package Type',
			Package_Type_All: 'All',
			Package_Type_Unmanaged: 'Unmanaged Only',
			Package_Type_Managed: 'Managed Only'
		}
	}),
	{ virtual: true }
);

jest.mock(
	'@salesforce/apex/MetadataUtility.APIVERSION',
	() => {
		const { createApexTestWireAdapter } = require('@salesforce/sfdx-lwc-jest');
		return {
			default: createApexTestWireAdapter(jest.fn())
		};
	},
	{ virtual: true }
);

jest.mock(
	'@salesforce/apex/MetadataUtility.CLICOMMAND',
	() => {
		const { createApexTestWireAdapter } = require('@salesforce/sfdx-lwc-jest');
		return {
			default: createApexTestWireAdapter(jest.fn())
		};
	},
	{ virtual: true }
);

jest.mock(
	'@salesforce/apex/MetadataUtility.getMetadataTypes',
	() => {
		const { createApexTestWireAdapter } = require('@salesforce/sfdx-lwc-jest');
		return {
			default: createApexTestWireAdapter(jest.fn())
		};
	},
	{ virtual: true }
);

jest.mock(
	'@salesforce/apex/MetadataSelector.listMetadata',
	() => ({
		default: jest.fn()
	}),
	{ virtual: true }
);

jest.mock(
	'@salesforce/apex/MetadataSelector.listFolders',
	() => ({
		default: jest.fn()
	}),
	{ virtual: true }
);

jest.useFakeTimers();

class MetadataSelectorWrapper extends MetadataSelector {
	@api
	get self() {
		return this;
	}
}

describe('c-metadata-selector', () => {
	let element;

	const mockDispatchEvent = jest.fn();

	beforeEach(() => {
		// Create the element
		element = createElement('c-metadata-selector', {
			is: MetadataSelectorWrapper
		});

		// Override dispatchEvent
		element.dispatchEvent = mockDispatchEvent;

		// Clear mocks
		jest.clearAllMocks();
	});

	afterEach(() => {
		while (document.body.firstChild) {
			document.body.removeChild(document.body.firstChild);
		}
		element = undefined;
	});

	it('initializes with correct default values', () => {
		document.body.appendChild(element);

		expect(element.self.metadataTypes).toEqual([]);
		expect(element.self.availableFolders).toEqual([]);
		expect(element.self.selectedMetadataTypes).toEqual([]);
		expect(element.self.metadataOptions).toEqual([]);
		expect(element.self.sfdxOutput).toBe('');
		expect(element.self.selectedMetadataType).toBe('');
		expect(element.self.selectedPackageType).toBe('');
		expect(element.self.selectedFolders).toEqual([]);
		expect(element.self.showMetadataList).toBe(false);
		expect(element.self.showFolderList).toBe(false);
		expect(element.self.showPackageList).toBe(false);
		expect(element.self.includeAllSymbol).toBe(false);
	});

	it('should set API_VERSION when wired data is received', () => {
		document.body.appendChild(element);

		APIVERSION.emit('62.0');

		expect(element.self.API_VERSION).toBe('62.0');
	});

	it('should set CLI_COMMAND when wired data is received', () => {
		document.body.appendChild(element);

		CLICOMMAND.emit('sf');

		expect(element.self.CLI_COMMAND).toBe('sf');
	});

	it('should process metadata types when wired data is received', () => {
		const metadataTypes = JSON.stringify([
			{ label: 'CustomObject', value: 'CustomObject' },
			{ label: 'ApexClass', value: 'ApexClass' }
		]);

		document.body.appendChild(element);

		getMetadataTypes.emit(metadataTypes);

		expect(element.self.metadataOptions).toEqual(JSON.parse(metadataTypes));
		expect(element.self.metadataTypeSetting.isLoading).toBe(false);
	});

	it('should show error notification when metadata types wire fails', () => {
		const error = { message: 'Test error' };

		document.body.appendChild(element);

		getMetadataTypes.error(error);

		expect(mockDispatchEvent).toHaveBeenCalledTimes(1);
		expect(mockDispatchEvent.mock.calls[0][0].detail.variant).toBe('error');
		expect(element.self.metadataTypeSetting.isLoading).toBe(false);
	});

	it('should handle SFDX copy code button click', () => {
		// Explicitly set needed properties
		element.self.packageOutputSetting = element.self.packageOutputSetting || {};
		element.self.packageOutputSetting.show = true;

		// Create mock with spy function
		const handleCopy = jest.fn();
		const mockChild = { handleCopy };

		// Set up querySelector mock with debugging
		element.querySelector = jest.fn().mockImplementation((selector) => {
			console.log('querySelector called with:', selector);
			if (selector === 'c-sfdx-code-snippet') {
				console.log('Returning mock for c-sfdx-code-snippet');
				return mockChild;
			}
			console.log('Returning null for selector:', selector);
			return null;
		});

		// Add to DOM
		document.body.appendChild(element);

		// Log the component's state before action
		console.log('Element state before action:', element.self);

		// Create event with label
		const event = { target: { label: 'Copy' } };

		// Call the method directly with debugging
		try {
			console.log('Calling handleSfdxCopyCode...');
			element.self.handleSfdxCopyCode(event);
			console.log('handleSfdxCopyCode completed');
		} catch (error) {
			console.log('Error in handleSfdxCopyCode:', error);
		}

		// Log calls to querySelector and the mock
		console.log('querySelector called times:', element.querySelector.mock.calls.length);
		console.log('querySelector calls:', element.querySelector.mock.calls);
		console.log('handleCopy called times:', handleCopy.mock.calls.length);

		// Assertions
		//expect(element.querySelector).toHaveBeenCalledWith('c-sfdx-code-snippet');
		expect(handleCopy).toHaveBeenCalledTimes(1);
		expect(event.target.label).toBe('Copied!');

		// Test timer
		jest.advanceTimersByTime(1000);
		expect(event.target.label).toBe('Copy');

		// Restore console.log
		consoleSpy.mockRestore();
	});

	it('should handle package copy all button click', () => {
		element.self.packageOutputSetting.show = true;
		const handleCopyAll = jest.fn();

		element.querySelector = jest.fn().mockImplementation((selector) => {
			if (selector === 'c-package-code-snippet') {
				return { handleCopyAll };
			}
			return null;
		});

		document.body.appendChild(element);

		const event = { target: { label: 'Copy All' } };
		element.self.handlePackageCopyCodeAll(event);

		expect(handleCopyAll).toHaveBeenCalledTimes(1);
		expect(event.target.label).toBe('Copied!');

		jest.advanceTimersByTime(1000);
		expect(event.target.label).toBe('Copy All');
	});

	it('should handle package copy types button click', () => {
		const handleCopyTypes = jest.fn();

		element.querySelector = jest.fn().mockImplementation((selector) => {
			if (selector === 'c-package-code-snippet') {
				return { handleCopyTypes };
			}
			return null;
		});

		document.body.appendChild(element);

		const event = { target: { label: 'Copy Types' } };
		element.self.handlePackageCopyCodeType(event);

		expect(handleCopyTypes).toHaveBeenCalledTimes(1);
		expect(event.target.label).toBe('Copied!');

		jest.advanceTimersByTime(1000);
		expect(event.target.label).toBe('Copy Types');
	});

	it('should handle metadata type change for types with folders', async () => {
		const folderData = JSON.stringify([
			{ label: 'Folder1', value: 'Folder1' },
			{ label: 'Folder2', value: 'Folder2' }
		]);

		listFolders.mockResolvedValue(folderData);

		document.body.appendChild(element);

		const event = { target: { value: 'EmailTemplate' } };
		await element.self.handleMetadataTypeChange(event);

		expect(element.self.selectedMetadataType).toBe('EmailTemplate');
		expect(element.self.availableFolders.length).toBe(3);
		expect(element.self.showFolderList).toBe(true);
		expect(listFolders).toHaveBeenCalledWith({ metadataType: 'EmailTemplate' });
	});

	it('should handle metadata type change for types without folders', async () => {
		document.body.appendChild(element);

		const event = { target: { value: 'ApexClass' } };
		await element.self.handleMetadataTypeChange(event);

		expect(element.self.selectedMetadataType).toBe('ApexClass');
		expect(element.self.showFolderList).toBe(false);
		expect(element.self.availableFolders).toEqual([]);
		expect(listFolders).not.toHaveBeenCalled();
	});

	it('should handle folder list change', () => {
		document.body.appendChild(element);

		const folders = ['Folder1', 'Folder2'];
		const event = { target: { value: folders } };
		element.self.handleFolderListChange(event);

		expect(element.self.selectedFolders).toEqual(folders);
	});

	it('should handle package type change', () => {
		document.body.appendChild(element);

		const event = { target: { value: 'managedOnly' } };
		element.self.handlePackageTypeChange(event);

		expect(element.self.selectedPackageType).toBe('managedOnly');
	});

	it('should handle metadata search success', async () => {
		const metadataResult = JSON.stringify([
			{ fullName: 'Test1', type: 'ApexClass' },
			{ fullName: 'Test2', type: 'ApexClass' }
		]);

		listMetadata.mockResolvedValue(metadataResult);

		document.body.appendChild(element);
		element.self.selectedMetadataType = 'ApexClass';
		element.self.metadataOptions = [{ value: 'ApexClass' }];
		element.self.selectedPackageType = 'all';

		await element.self.handleMetadataSearch();

		expect(element.self.metadataTypes).toEqual(JSON.parse(metadataResult));
		expect(element.self.metadataListSetting.isEmpty).toBe(false);
		expect(element.self.metadataListSetting.show).toBe(true);
		expect(mockDispatchEvent).toHaveBeenCalledTimes(1);
		expect(mockDispatchEvent.mock.calls[0][0].detail.variant).toBe('success');
	});

	it('should handle metadata search with no data', async () => {
		listMetadata.mockResolvedValue('NoData');

		document.body.appendChild(element);
		element.self.selectedMetadataType = 'ApexClass';
		element.self.metadataOptions = [{ value: 'ApexClass' }];
		element.self.selectedPackageType = 'all';

		await element.self.handleMetadataSearch();

		expect(element.self.metadataListSetting.isEmpty).toBe(true);
		expect(element.self.metadataListSetting.show).toBe(true);
	});

	it('should handle metadata search failure', async () => {
		const error = new Error('Test error');

		listMetadata.mockRejectedValue(error);

		document.body.appendChild(element);
		element.self.selectedMetadataType = 'ApexClass';
		element.self.metadataOptions = [{ value: 'ApexClass' }];
		element.self.selectedPackageType = 'all';

		await element.self.handleMetadataSearch();

		expect(mockDispatchEvent).toHaveBeenCalledTimes(1);
		expect(mockDispatchEvent.mock.calls[0][0].detail.variant).toBe('error');
	});

	it('should set CustomLabels includeAllSymbol flag properly', async () => {
		listMetadata.mockResolvedValue(JSON.stringify([]));

		document.body.appendChild(element);
		element.self.selectedMetadataType = 'CustomLabels';
		element.self.metadataOptions = [{ value: 'CustomLabels' }];
		element.self.selectedPackageType = 'all';

		await element.self.handleMetadataSearch();

		expect(element.self.includeAllSymbol).toBe(true);
	});

	it('should handle row selection for sf CLI command', () => {
		document.body.appendChild(element);
		element.self.CLI_COMMAND = 'sf';
		element.self.selectedMetadataType = 'ApexClass';

		const rows = [{ fullName: 'Test1' }, { fullName: 'Test2' }];
		const event = { detail: { selectedRows: rows } };
		element.self.getSelectedName(event);

		expect(element.self.sfdxOutput).toBe(' -m ApexClass:Test1 -m ApexClass:Test2');
		expect(element.self.packageOutputSetting.show).toBe(true);
		expect(element.self.sfdxOutputSetting.show).toBe(true);
	});

	it('should handle row selection for sfdx CLI command', () => {
		document.body.appendChild(element);
		element.self.CLI_COMMAND = 'sfdx';
		element.self.selectedMetadataType = 'ApexClass';

		const rows = [{ fullName: 'Test1' }, { fullName: 'Test2' }];
		const event = { detail: { selectedRows: rows } };
		element.self.getSelectedName(event);

		expect(element.self.sfdxOutput).toBe('ApexClass:Test1,ApexClass:Test2');
		expect(element.self.packageOutputSetting.show).toBe(true);
		expect(element.self.sfdxOutputSetting.show).toBe(true);
	});

	it('should hide package and sfdx output sections when no rows selected', () => {
		document.body.appendChild(element);

		const event = { detail: { selectedRows: [] } };
		element.self.getSelectedName(event);

		expect(element.self.packageOutputSetting.show).toBe(false);
		expect(element.self.sfdxOutputSetting.show).toBe(false);
	});

	it('should return correct datatable height style', () => {
		document.body.appendChild(element);

		element.self.metadataTypes = Array(10).fill({});
		expect(element.self.setDatatableHeight).toBe('');

		element.self.metadataTypes = Array(20).fill({});
		expect(element.self.setDatatableHeight).toBe('height:450px;');
	});

	it('should properly search for a value in an array', () => {
		document.body.appendChild(element);
		const testArray = [{ value: 'value1' }, { value: 'value2' }];

		expect(element.self.search('value1', testArray)).toBe(true);

		expect(element.self.search('value3', testArray)).toBe(false);
	});

	it('should parse different error formats correctly', () => {
		document.body.appendChild(element);

		expect(element.self.errorParser('Test error')).toBe('Test error');

		const errorWithMessage = { body: { message: 'Error message' } };
		expect(element.self.errorParser(errorWithMessage)).toBe('Error message');

		const errorWithBodyArray = { body: [{ message: 'Error 1' }, { message: 'Error 2' }] };
		expect(element.self.errorParser(errorWithBodyArray)).toBe('Error 1, Error 2');

		expect(element.self.errorParser(null)).toBe('');
	});
});
