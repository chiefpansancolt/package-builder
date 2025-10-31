import { labels } from 'c/labelService';

describe('Labels Service', () => {
	it('should have correct label values', () => {
		const keys = Object.keys(labels);
		expect(keys).toContain('Metadata_Type_Selector');
		expect(keys).toContain('Metadata_Types');
		expect(keys).toContain('Folders');
		expect(keys).toContain('Metadata_Types_Placeholder');
		expect(keys).toContain('Folders_Placeholder');
		expect(keys).toContain('Package_Types_Placeholder');
		expect(keys).toContain('Metadata_Types_Missing');
		expect(keys).toContain('Folders_Missing');
		expect(keys).toContain('Package_Types_Missing');
		expect(keys).toContain('Search_Button');
		expect(keys).toContain('Results_Title');
		expect(keys).toContain('Package_Title');
		expect(keys).toContain('SFDX_Retrieve_Title');
		expect(keys).toContain('Package_Type_All');
		expect(keys).toContain('Package_Type_Unmanaged');
		expect(keys).toContain('Package_Type_Managed');
		expect(keys).toContain('Metadata_Retrieve_Error_Title');
		expect(keys).toContain('Metadata_Retrieve_Success_Message');
		expect(keys).toContain('Package_Types');
		expect(keys).toContain('Metadata_Retrieve_Success_Title');
		expect(keys).toContain('Invalid_Metadata_Types');
		expect(keys).toContain('Invalid_Package_Types');
		expect(keys).toContain('Copy_Button_Label');
		expect(keys).toContain('Copy_All_Button_Label');
		expect(keys).toContain('Copy_Types_Button_Label');
		expect(keys).toContain('Copied_Button_Label');
		expect(keys).toContain('Available_Folders_Label');
		expect(keys).toContain('Selected_Folders_Label');
	});
});
