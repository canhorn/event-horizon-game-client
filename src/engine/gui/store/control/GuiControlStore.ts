import { Dictionary } from "../../../../core/collection/Dictionary";
import { GuiControl } from "../../model/GuiControl";
import { IGuiControlState } from "./IGuiControlState";

const STATE: IGuiControlState = {
    controlMap: new Dictionary(),
};

export const guiControlStore = {
    get state(): IGuiControlState {
        return STATE;
    },
};

export const addGuiControl = (control: GuiControl) =>
    STATE.controlMap.setValue(control.id, control);
export const getGuiControl = (id: string) => STATE.controlMap.getValue(id);
export const removeGuiControl = (id: string) => STATE.controlMap.remove(id);
