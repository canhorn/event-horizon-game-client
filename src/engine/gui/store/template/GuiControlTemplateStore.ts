import { Dictionary } from "../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../core/collection/IDictionary";
import { IGuiControlTemplate } from "../../api/IGuiControlTemplate";

export interface IGuiTemplateState {
    templateMap: IDictionary<string, IGuiControlTemplate>;
}
const STATE: IGuiTemplateState = {
    templateMap: new Dictionary(),
};

export const addGuiControlTemplate = (template: IGuiControlTemplate) =>
    STATE.templateMap.setValue(template.id, template);
export const getGuiControlTemplate = (id: string) =>
    STATE.templateMap.getValue(id);
export const hasGuiControlTemplate = (id: string) =>
    STATE.templateMap.containsKey(id);
