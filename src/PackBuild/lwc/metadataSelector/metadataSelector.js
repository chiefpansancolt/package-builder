/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

/* Import Custom Utilities */
import { MS_COLUMNS } from 'c/metadataSelectorTableColumns';
import { CONSTANTS } from 'c/metadataSelectorUtilities';
import { labels } from 'c/labelService';

/* Import Class Methods */
import APIVERSION from '@salesforce/apex/MetadataUtility.APIVERSION';
import CLICOMMAND from '@salesforce/apex/MetadataUtility.CLICOMMAND';
import listMetadata from '@salesforce/apex/MetadataSelector.listMetadata';
import listFolders from '@salesforce/apex/MetadataSelector.listFolders';
import getMetadataTypes from '@salesforce/apex/MetadataUtility.getMetadataTypes';

export default class MetadataSelector extends LightningElement {
	metadataTypes = [];
	availableFolders = [];
	selectedMetadataTypes = [];
	metadataOptions = [];
	columns = MS_COLUMNS;
	sfdxOutput = CONSTANTS.BLANK;
	selectedMetadataType = CONSTANTS.BLANK;
	selectedPackageType = CONSTANTS.BLANK;
	selectedFolders = [];
	showMetadataList = false;
	showFolderList = false;
	showPackageList = false;
	includeAllSymbol = false;
	labels = labels;

	@track metadataTypeSetting = {
		title: labels.Metadata_Type_Selector,
		iconName: CONSTANTS.ICONS.METADATATYPE,
		isLoading: true,
		isEmpty: false,
		hideFooter: false,
		emptyText: CONSTANTS.BLANK
	};

	@track metadataListSetting = {
		title: labels.Results_Title,
		iconName: CONSTANTS.ICONS.METADATALIST,
		isLoading: false,
		isEmpty: false,
		hideFooter: true,
		emptyText: 'No Metadata Found with these search parameters',
		show: false
	};

	@track packageOutputSetting = {
		title: labels.Package_Title,
		iconName: CONSTANTS.ICONS.PACKAGE,
		isLoading: false,
		isEmpty: false,
		hideFooter: true,
		emptyText: CONSTANTS.BLANK,
		show: false
	};

	@track sfdxOutputSetting = {
		title: labels.SFDX_Retrieve_Title,
		iconName: CONSTANTS.ICONS.SFDX,
		isLoading: false,
		isEmpty: false,
		hideFooter: true,
		emptyText: CONSTANTS.BLANK,
		show: false
	};

	@wire(APIVERSION)
	wiredApiVersion({ data }) {
		if (data) {
			this.API_VERSION = data;
		}
	}

	@wire(CLICOMMAND)
	wiredCliCommand({ data }) {
		if (data) {
			this.CLI_COMMAND = data;
		}
	}

	@wire(getMetadataTypes)
	wiredGetMetadataTypes({ error, data }) {
		if (data) {
			this.metadataOptions = JSON.parse(data);
			this.metadataTypeSetting.isLoading = false;
		} else if (error) {
			this.showNotification(error, null, CONSTANTS.VARIANTOPTIONS[0].value, 'sticky');
			this.metadataTypeSetting.isLoading = false;
		}
	}

	handleSfdxCopyCode(event) {
		this.template.querySelector('c-sfdx-code-snippet')?.handleCopy();
		let button = event.target;
		button.label = labels.Copied_Button_Label;

		setTimeout(() => {
			button.label = labels.Copy_Button_Label;
		}, 1000);
	}

	handlePackageCopyCodeAll(event) {
		this.template.querySelector('c-package-code-snippet')?.handleCopyAll();
		let button = event.target;
		button.label = labels.Copied_Button_Label;

		setTimeout(() => {
			button.label = labels.Copy_All_Button_Label;
		}, 1000);
	}

	handlePackageCopyCodeType(event) {
		this.template.querySelector('c-package-code-snippet')?.handleCopyTypes();
		let button = event.target;
		button.label = labels.Copied_Button_Label;

		setTimeout(() => {
			button.label = labels.Copy_Types_Button_Label;
		}, 1000);
	}

	handleMetadataTypeChange(event) {
		this.selectedMetadataType = event.target.value;
		this.selectedFolders = [];
		if (
			event.target.value === 'EmailTemplate' ||
			event.target.value === 'Document' ||
			event.target.value === 'Report' ||
			event.target.value === 'Dashboard'
		) {
			this.metadataTypeSetting.isLoading = true;
			listFolders({ metadataType: this.selectedMetadataType })
				.then((result) => {
					this.availableFolders = JSON.parse(result);
					if (this.selectedMetadataType === 'EmailTemplate' || this.selectedMetadataType === 'Report') {
						this.availableFolders.push({
							label: 'unfiled$public',
							value: 'unfiled$public'
						});
					}
					this.showFolderList = true;
					this.metadataTypeSetting.isLoading = false;
				})
				.catch((error) => {
					this.showFolderList = false;
					this.availableFolders = [];
					this.selectedFolder = '';

					this.showNotification(error, labels.Metadata_Retrieve_Error_Title, CONSTANTS.VARIANTOPTIONS[0].value, 'sticky');
					this.metadataTypeSetting.isLoading = false;
				});
		} else {
			this.showFolderList = false;
			this.availableFolders = [];
			this.selectedFolder = '';
		}
	}

	handleFolderListChange(event) {
		this.selectedFolders = event.target.value;
	}

	handlePackageTypeChange(event) {
		this.selectedPackageType = event.target.value;
	}

	handleMetadataSearch() {
		this.metadataTypeSetting.isLoading = true;
		if (!this.search(this.selectedMetadataType, this.metadataOptions)) {
			this.message = labels.Invalid_Metadata_Types;
		}

		if (!this.search(this.selectedPackageType, this.packageTypeOptions)) {
			this.message = labels.Invalid_Package_Types;
		}

		listMetadata({
			metadataType: this.selectedMetadataType,
			folderNames: this.selectedFolders,
			packageType: this.selectedPackageType
		})
			.then((result) => {
				if (result === 'NoData') {
					this.metadataListSetting.isEmpty = true;
				} else {
					this.metadataListSetting.isEmpty = false;
					this.metadataTypes = JSON.parse(result);
				}
				this.metadataListSetting.show = true;
				if (this.selectedMetadataType === 'CustomLabels') {
					this.includeAllSymbol = true;
				} else {
					this.includeAllSymbol = false;
				}

				this.showNotification(
					labels.Metadata_Retrieve_Success_Message,
					labels.Metadata_Retrieve_Success_Title,
					CONSTANTS.VARIANTOPTIONS[2].value,
					'dismissable'
				);
				this.metadataTypeSetting.isLoading = false;
			})
			.catch((error) => {
				this.data = undefined;
				this.includeAllSymbol = false;

				this.showNotification(error, labels.Metadata_Retrieve_Error_Title, CONSTANTS.VARIANTOPTIONS[0].value, 'sticky');
				this.metadataTypeSetting.isLoading = false;
			});
	}

	getSelectedName(event) {
		this.selectedMetadataTypes = event.detail.selectedRows;
		this.sfdxOutput = CONSTANTS.BLANK;

		this.selectedMetadataTypes.forEach((element) => {
			if (this.CLI_COMMAND == 'sf') {
				this.sfdxOutput += ' -m ' + this.selectedMetadataType + ':' + element.fullName;
			} else {
				this.sfdxOutput += this.selectedMetadataType + ':' + element.fullName + ',';
			}
		});

		this.sfdxOutput = this.sfdxOutput.slice(0, -1);

		if (this.selectedMetadataTypes.length > 0) {
			this.packageOutputSetting.show = true;
			this.sfdxOutputSetting.show = true;
		} else {
			this.packageOutputSetting.show = false;
			this.sfdxOutputSetting.show = false;
		}
	}

	get min() {
		return 1;
	}

	get max() {
		return 3;
	}

	get packageTypeOptions() {
		return [
			{ label: labels.Package_Type_All, value: 'all' },
			{ label: labels.Package_Type_Unmanaged, value: 'unmanagedOnly' },
			{ label: labels.Package_Type_Managed, value: 'managedOnly' }
		];
	}

	get setDatatableHeight() {
		if (this.metadataTypes.length > 15) {
			return 'height:450px;';
		}
		return '';
	}

	search(nameKey, anArray) {
		var status = false;
		// eslint-disable-next-line vars-on-top
		for (var i = 0; i < anArray.length; i++) {
			if (anArray[i].value === nameKey) {
				status = true;
			}
		}
		return status;
	}

	showNotification(error, title, variant, mode) {
		const message = this.errorParser(error);

		this.dispatchEvent(
			new ShowToastEvent({
				title,
				message,
				variant,
				mode
			})
		);
	}

	errorParser(error) {
		if (!error) {
			return '';
		} else if (error.body) {
			return Array.isArray(error.body) ? error.body.map((e) => e.message).join(', ') : error.body.message;
		}

		return error;
	}
}
