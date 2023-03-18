/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement, track, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

/* Import Custom Utilities */
import { MS_COLUMNS } from "c/metadataSelectorTableColumns";
import { CONSTANTS } from "c/metadataSelectorUtilities";

/* Import Class Methods */
import listMetadata from "@salesforce/apex/MetadataSelector.listMetadata";
import listFolders from "@salesforce/apex/MetadataSelector.listFolders";
import getMetadataTypes from "@salesforce/apex/MetadataUtility.getMetadataTypes";

/* Import Custom Labels */
import Metadata_Type_Selector from "@salesforce/label/c.Metadata_Type_Selector";
import Metadata_Types from "@salesforce/label/c.Metadata_Types";
import Folders from "@salesforce/label/c.Folders";
import Metadata_Types_Placeholder from "@salesforce/label/c.Metadata_Types_Placeholder";
import Folders_Placeholder from "@salesforce/label/c.Folders_Placeholder";
import Package_Types_Placeholder from "@salesforce/label/c.Package_Types_Placeholder";
import Metadata_Types_Missing from "@salesforce/label/c.Metadata_Types_Missing";
import Folders_Missing from "@salesforce/label/c.Folders_Missing";
import Package_Types_Missing from "@salesforce/label/c.Package_Types_Missing";
import Search_Button from "@salesforce/label/c.Search_Button";
import Results_Title from "@salesforce/label/c.Results_Title";
import Package_Title from "@salesforce/label/c.Package_Title";
import SFDX_Retrieve_Title from "@salesforce/label/c.SFDX_Retrieve_Title";
import Package_Type_All from "@salesforce/label/c.Package_Type_All";
import Package_Type_Unmanaged from "@salesforce/label/c.Package_Type_Unmanaged";
import Package_Type_Managed from "@salesforce/label/c.Package_Type_Managed";
import Metadata_Retrieve_Error_Title from "@salesforce/label/c.Metadata_Retrieve_Error_Title";
import Metadata_Retrieve_Success_Message from "@salesforce/label/c.Metadata_Retrieve_Success_Message";
import Package_Types from "@salesforce/label/c.Package_Types";
import Metadata_Retrieve_Success_Title from "@salesforce/label/c.Metadata_Retrieve_Success_Title";
import Invalid_Metadata_Types from "@salesforce/label/c.Invalid_Metadata_Types";
import Invalid_Package_Types from "@salesforce/label/c.Invlid_Package_Types";
import Copy_Button_Label from "@salesforce/label/c.Copy_Button_Label";
import Copy_All_Button_Label from "@salesforce/label/c.Copy_All_Button_Label";
import Copy_Types_Button_Label from "@salesforce/label/c.Copy_Types_Button_Label";
import Copied_Button_Label from "@salesforce/label/c.Copied_Button_Label";

export default class MetadataSelector extends LightningElement {
  @track metdataTypes = [];
  @track availableFolders = [];
  @track selectedMetadataTypes = [];
  @track metadataOptions = [];
  @track columns = MS_COLUMNS;
  @track sfdxOutput = CONSTANTS.BLANK;
  @track selectedMetadataType = CONSTANTS.BLANK;
  @track selectedPackageType = CONSTANTS.BLANK;
  @track selectedFolders = [];
  @track showMetadataList = false;
  @track showFolderList = false;
  @track showPackageList = false;
  @track includeAllSymbol = false;

  labels = {
    Metadata_Types,
    Folders,
    Package_Types,
    Metadata_Types_Placeholder,
    Folders_Placeholder,
    Package_Types_Placeholder,
    Metadata_Types_Missing,
    Folders_Missing,
    Package_Types_Missing,
    Search_Button,
    Metadata_Retrieve_Success_Title,
    Copy_Button_Label,
    Copy_All_Button_Label,
    Copy_Types_Button_Label
  };

  @track metadataTypeSetting = {
    title: Metadata_Type_Selector,
    iconName: CONSTANTS.ICONS.METADATATYPE,
    isLoading: true,
    isEmpty: false,
    hideFooter: false,
    emptyText: CONSTANTS.BLANK
  };

  @track metadataListSetting = {
    title: Results_Title,
    iconName: CONSTANTS.ICONS.METADATALIST,
    isLoading: false,
    isEmpty: false,
    hideFooter: true,
    emptyText: "No Metadata Found with these search parameters",
    show: false
  };

  @track packageOutputSetting = {
    title: Package_Title,
    iconName: CONSTANTS.ICONS.PACKAGE,
    isLoading: false,
    isEmpty: false,
    hideFooter: true,
    emptyText: CONSTANTS.BLANK,
    show: false
  };

  @track sfdxOutputSetting = {
    title: SFDX_Retrieve_Title,
    iconName: CONSTANTS.ICONS.SFDX,
    isLoading: false,
    isEmpty: false,
    hideFooter: true,
    emptyText: CONSTANTS.BLANK,
    show: false
  };

  @wire(getMetadataTypes)
  wiredGetMetadataTypes({ error, data}) {
    if (data) {
      this.metadataOptions = JSON.parse(data);
      this.metadataTypeSetting.isLoading = false;
    } else if (error) {
      this.showNotification(0, error, CONSTANTS.BLANK, CONSTANTS.BLANK);
      this.metadataTypeSetting.isLoading = false;
    }
  }

  handleSfdxCopyCode(event) {
    this.template.querySelector("c-sfdx-code-snippet").handleCopy();
    let button = event.target;
    button.label = Copied_Button_Label;

    setTimeout(() => {
      button.label = Copy_Button_Label;
    }, 1000);
  }

  handlePackageCopyCodeAll(event) {
    this.template.querySelector("c-package-code-snippet").handleCopyAll();
    let button = event.target;
    button.label = Copied_Button_Label;

    setTimeout(() => {
      button.label = Copy_All_Button_Label;
    }, 1000);
  }

  handlePackageCopyCodeType(event) {
    this.template.querySelector("c-package-code-snippet").handleCopyTypes();
    let button = event.target;
    button.label = Copied_Button_Label;

    setTimeout(() => {
      button.label = Copy_Types_Button_Label;
    }, 1000);
  }

  handleMetadataTypeChange(event) {
    this.selectedMetadataType = event.target.value;
    this.selectedFolders = [];
    if (
      event.target.value === "EmailTemplate" ||
      event.target.value === "Document" ||
      event.target.value === "Report" ||
      event.target.value === "Dashboard"
    ) {
      this.metadataTypeSetting.isLoading = true;
      listFolders({ metadataType: this.selectedMetadataType })
        .then((result) => {
          this.availableFolders = JSON.parse(result);
          if (this.selectedMetadataType === "EmailTemplate" || this.selectedMetadataType === "Report") {
            this.availableFolders.push({
              label: "unfiled$public",
              value: "unfiled$public"
            });
          }
          this.showFolderList = true;
          this.metadataTypeSetting.isLoading = false;
        })
        .catch((error) => {
          this.showFolderList = false;
          this.availableFolders = [];
          this.selectedFolder = "";

          this.showNotification(0, error, CONSTANTS.BLANK, Metadata_Retrieve_Error_Title);
          this.metadataTypeSetting.isLoading = false;
        });
    } else {
      this.showFolderList = false;
      this.availableFolders = [];
      this.selectedFolder = "";
    }
  }

  handleFolderListChange(event) {
    this.selectedFolders = event.target.value;
    console.log(event.target.value);
  }

  handlePackageTypeChange(event) {
    this.selectedPackageType = event.target.value;
  }

  handleMetadataSearch() {
    this.metadataTypeSetting.isLoading = true;
    if (!this.search(this.selectedMetadataType, this.metadataOptions)) {
      this.message = Invalid_Metadata_Types;
    }

    if (!this.search(this.selectedPackageType, this.packageTypeOptions)) {
      this.message = Invalid_Package_Types;
    }

    listMetadata({
      metadataType: this.selectedMetadataType,
      folderNames: this.selectedFolders,
      packageType: this.selectedPackageType
    })
      .then((result) => {
        if (result === "NoData") {
          this.metadataListSetting.isEmpty = true;
        } else {
          this.metadataListSetting.isEmpty = false;
          this.metdataTypes = JSON.parse(result);
        }
        this.metadataListSetting.show = true;
        if (this.selectedMetadataType === "CustomLabels") {
          this.includeAllSymbol = true;
        } else {
          this.includeAllSymbol = false;
        }

        this.showNotification(2, CONSTANTS.BLANK, Metadata_Retrieve_Success_Message, Metadata_Retrieve_Success_Title);
        this.metadataTypeSetting.isLoading = false;
      })
      .catch((error) => {
        this.data = undefined;
        this.includeAllSymbol = false;

        this.showNotification(0, error, CONSTANTS.BLANK, Metadata_Retrieve_Error_Title);
        this.metadataTypeSetting.isLoading = false;
      });
  }

  getSelectedName(event) {
    this.selectedMetadataTypes = event.detail.selectedRows;
    this.sfdxOutput = CONSTANTS.BLANK;

    this.selectedMetadataTypes.forEach((element) => {
      this.sfdxOutput += this.selectedMetadataType + ":" + element.fullName + ",";
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
      { label: Package_Type_All, value: "all" },
      { label: Package_Type_Unmanaged, value: "unmanagedOnly" },
      { label: Package_Type_Managed, value: "managedOnly" }
    ];
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

  showNotification(type, error, msg, title) {
    const evt = new ShowToastEvent({
      title: title !== CONSTANTS.BLANK ? title : CONSTANTS.VARIANTOPTIONS[type].label,
      message: type === 0 ? error.body.message : msg,
      variant: CONSTANTS.VARIANTOPTIONS[type].value,
      mode: type === 0 ? "sticky" : "dismissible"
    });
    this.dispatchEvent(evt);
  }
}
