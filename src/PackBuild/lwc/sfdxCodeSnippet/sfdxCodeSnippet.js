import { LightningElement, api } from "lwc";

/* Import Custom Utilities */
import { copy } from "c/metadataSelectorUtilities";

export default class SfdxCodeSnippet extends LightningElement {
  @api sfdxOutput;
  @api cli;

  @api
  async handleCopy() {
    let input = document.createElement("textarea");
    input.value = this.template.querySelector("code").innerText.substring(2);

    document.body.appendChild(input);
    input.select();

    if (navigator.clipboard) {
      const selection = document.getSelection();
      await copy(selection.toString());
    } else {
      document.execCommand("copy");
    }
    document.body.removeChild(input);
  }

  get cliCommand() {
    if (this.cli === "sf") {
      return "sf metadata retrieve -m ";
    }

    return "sfdx force:source:retrieve -m ";
  }
}
