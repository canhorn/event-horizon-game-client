import { Dictionary } from "../../../../core/collection/Dictionary";
import { GuiControlLayout } from "../../model/GuiControlLayout";
import { IGuiLayoutState } from "./IGuiLayoutState";

const STATE: IGuiLayoutState = {
    layoutMap: new Dictionary(),
};

export const guiLayoutStore = {
    get state(): IGuiLayoutState {
        return STATE;
    },
};

export const addGuiLayout = (layout: GuiControlLayout) =>
    STATE.layoutMap.setValue(layout.id, layout);
