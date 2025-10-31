const CONSTANTS = {
	APIVERSION: '62.0',
	ICONS: {
		METADATATYPE: 'custom:custom63',
		METADATALIST: 'standard:related_list',
		PACKAGE: 'standard:file',
		SFDX: 'standard:file'
	},
	BLANK: '',
	DEFAULT_MESSAGE: 'Message',
	VARIANTOPTIONS: [
		{ label: 'Error', value: 'error' },
		{ label: 'Warning', value: 'warning' },
		{ label: 'Success', value: 'success' },
		{ label: 'Info', value: 'info' }
	]
};

const copy = async (textToCopy) =>
	navigator.clipboard.writeText(textToCopy).catch(
		(err) => console.error(JSON.stringify(err))
	);

export { CONSTANTS, copy };
