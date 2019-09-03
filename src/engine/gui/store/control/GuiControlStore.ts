import { Dictionary } from "../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../core/collection/IDictionary";
import { IGuiControl } from "../../api/IGuiControl";
import { generateGuiControlId } from "../../utils/GenerateGuiControlId";

interface IGuiControlState {
    controlMap: IDictionary<string, IGuiControl>;
}

const STATE: IGuiControlState = {
    controlMap: new Dictionary(),
};

export const setGuiControlInStore = (guiId: string, control: IGuiControl) =>
    STATE.controlMap.setValue(generateGuiControlId(guiId, control.id), control);

export const getGuiControlFromStore = (
    guiId: string,
    controlId: string
): IGuiControl | undefined =>
    STATE.controlMap.getValue(generateGuiControlId(guiId, controlId));

export const removeGuiControlFromStore = (
    guiId: string,
    controlId: string
): IGuiControl | undefined =>
    STATE.controlMap.remove(generateGuiControlId(guiId, controlId));

export const getGuiControlFromStoreByGeneratedId = (
    id: string
): IGuiControl | undefined => STATE.controlMap.getValue(id);
