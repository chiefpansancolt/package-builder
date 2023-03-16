import { LightningElement, api } from "lwc";

export default class LightningCard extends LightningElement {
  @api title;
  @api iconName;
  @api loadingAlternativeText;
  @api isLoading = false;
  @api isEmpty = false;
  @api hideFooter = false;
  @api emptyText = "No Data Available to display.";
  @api hasBodyPadding = false;
  @api variant = "base";

  labels = {
    LoadingAlternativeText: "Loading"
  };

  /**
   * determines if an icon was defined
   * @return  `boolean`
   */
  get hasIcon() {
    return this.iconName ? true : false;
  }

  /**
   * Sets the loading text based on if alt test was set or uses default text
   * @return  `string`
   */
  get loadingText() {
    return this.loadingAlternativeText ? this.loadingAlternativeText : this.labels.LoadingAlternativeText;
  }

  /**
   * Sets the Card level classes based on variant defined, supports, base and ui
   * @return  `string`
   */
  get cardClassNames() {
    if (this.variant === "ui") {
      return "slds-card slds-card_boundary slds-var-m-horizontal_large";
    }

    return "slds-card slds-card_boundary";
  }

  /**
   * Sets the Card body classes based on if bodyPadding is true
   * @return  `string`
   */
  get bodyClassNames() {
    if (this.hasBodyPadding) {
      return "slds-card__body slds-card__body_inner";
    }

    return "slds-card__body";
  }
}
