import { MS_COLUMNS } from 'c/metadataSelectorTableColumns';

describe('c-metadata-selector-table-columns', () => {
	it('validate columns', () => {
		expect(MS_COLUMNS.length).toBe(4);
		expect(MS_COLUMNS[0].label).toBe('c.Name_Column');
		expect(MS_COLUMNS[1].label).toBe('c.File_Name_Column');
		expect(MS_COLUMNS[2].label).toBe('c.Manageable_State_Column');
		expect(MS_COLUMNS[3].label).toBe('c.Namespace_Column');
	});
});
