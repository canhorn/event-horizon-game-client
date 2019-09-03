import { Dictionary } from "../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../core/collection/IDictionary";
import { IGuiLayoutData } from "../../api/IGuiLayoutData";

interface IGuiLayoutDataState {
    layoutMap: IDictionary<string, IGuiLayoutData>;
}

const STATE: IGuiLayoutDataState = {
    layoutMap: new Dictionary(),
};

export const setGuiLayoutDataInStore = (layout: IGuiLayoutData) =>
    STATE.layoutMap.setValue(layout.id, layout);

export const getGuiLayoutDataFromStore = (
    layoutId: string
): IGuiLayoutData | undefined => STATE.layoutMap.getValue(layoutId);
