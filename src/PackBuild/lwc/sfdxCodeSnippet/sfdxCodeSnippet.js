import { LightningElement, api } from "lwc";

export default class SfdxCodeSnippet extends LightningElement {
  @api sfdxOutput;

  @api
  async handleCopy() {
    let input = document.createElement("textarea");
    input.innerHTML = this.template.querySelector("code").innerText.substring(2);

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
}

export const copy = async (textToCopy) =>
  await navigator.clipboard.writeText(textToCopy).catch(
    (err) => console.error(JSON.stringify(err)),
    (err) => console.error(JSON.stringify(err))
  );
