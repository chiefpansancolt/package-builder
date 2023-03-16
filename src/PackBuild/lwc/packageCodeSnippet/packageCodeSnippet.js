import { LightningElement, api } from "lwc";

/* Import Custom Utilities */
import { CONSTANTS } from "c/metadataSelectorUtilities";

export default class PackageCodeSnippet extends LightningElement {
  @api includeAllSymbol = false;
  @api selectedMetadataTypes;
  @api selectedMetadataType;

  labels = {
    apiversion: CONSTANTS.APIVERSION,
    name: "name",
    version: "version",
    types: "types",
    members: "members",
    package: "Package"
  }
}