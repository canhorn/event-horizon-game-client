import { Dictionary } from "../../../../core/collection/Dictionary";
import { GuiTemplate } from "../../model/GuiTemplate";
import { IGuiTemplateState } from "./IGuiTemplateState";

const STATE: IGuiTemplateState = {
    templateMap: new Dictionary(),
};

export const guiTemplateStore = {
    get state(): IGuiTemplateState {
        return STATE;
    },
};

export const addGuiTemplate = (template: GuiTemplate) =>
    STATE.templateMap.setValue(template.id, template);
export const getGuiTemplate = (id: string) => STATE.templateMap.getValue(id);
export const hasGuiTemplate = (id: string) => STATE.templateMap.containsKey(id);
