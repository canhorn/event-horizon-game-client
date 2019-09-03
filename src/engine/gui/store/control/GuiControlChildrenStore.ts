import { Dictionary } from "../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../core/collection/IDictionary";

interface IGuiControlState {
    controlMap: IDictionary<string, string[]>;
}

const STATE: IGuiControlState = {
    controlMap: new Dictionary(),
};

export const addChildGuiToControl = (
    controlId: string,
    childGuiId: string
): void => {
    const childList = STATE.controlMap.getValue(controlId) || [];
    childList.push(childGuiId);
};

export const getChildrenOfGuiControl = (
    controlId: string
): string[] | undefined => STATE.controlMap.getValue(controlId);

export const removeTrackingOfGuiControlChildren = (
    controlId: string
): string[] | undefined => STATE.controlMap.remove(controlId);
