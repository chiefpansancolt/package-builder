import { LightningElement, api } from "lwc";

/* Import Custom Utilities */
import { CONSTANTS, copy } from "c/metadataSelectorUtilities";

export default class PackageCodeSnippet extends LightningElement {
  @api includeAllSymbol = false;
  @api selectedMetadataTypes;
  @api selectedMetadataType;

  @api
  async handleCopyAll() {
    let members = "";
    for (let i = 0; i < this.selectedMetadataTypes.length; i++) {
      members += "    <members>" + this.selectedMetadataTypes[i].fullName + "</members>\n";
    }
    members.replace(/\n$/, "");
    const code = `<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
  <types>
${members}    <name>${this.selectedMetadataType}</name>
  </types>
  <version>56.0</version>
</Package>`;

    const input = document.createElement("textarea");
    input.value = code;

    document.body.appendChild(input);
    input.select();

    if (navigator.clipboard) {
      console.log("clipy");
      const selection = document.getSelection();
      await copy(selection.toString());
    } else {
      document.execCommand("copy");
    }
    document.body.removeChild(input);
  }

  @api
  async handleCopyTypes() {
    let members = "";
    for (let i = 0; i < this.selectedMetadataTypes.length; i++) {
      members += "    <members>" + this.selectedMetadataTypes[i].fullName + "</members>\n";
    }
    members.replace(/\n$/, "");
    const code = `<types>
${members}    <name>${this.selectedMetadataType}</name>
  </types>`;

    const input = document.createElement("textarea");
    input.value = code;

    document.body.appendChild(input);
    input.select();

    if (navigator.clipboard) {
      console.log("clipy");
      const selection = document.getSelection();
      await copy(selection.toString());
    } else {
      document.execCommand("copy");
    }
    document.body.removeChild(input);
  }

  labels = {
    apiversion: CONSTANTS.APIVERSION,
    name: "name",
    version: "version",
    types: "types",
    members: "members",
    package: "Package"
  };
}
