/* Import Custom Labels */
import Name_Column from "@salesforce/label/c.Name_Column";
import File_Name_Column from "@salesforce/label/c.File_Name_Column";
import Manageable_State_Column from "@salesforce/label/c.Manageable_State_Column";
import Namespace_Column from "@salesforce/label/c.Namespace_Column";

const MS_COLUMNS = [
  { label: Name_Column, fieldName: "fullName", type: "text", hideDefaultActions: true },
  { label: File_Name_Column, fieldName: "fileName", type: "text", hideDefaultActions: true },
  {
    label: Manageable_State_Column,
    fieldName: "manageableState",
    type: "text",
    fixedWidth: 125,
    hideDefaultActions: true
  },
  { label: Namespace_Column, fieldName: "namespacePrefix", type: "text", fixedWidth: 125, hideDefaultActions: true }
];

export { MS_COLUMNS };
