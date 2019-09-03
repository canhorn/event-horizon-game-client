import { Dictionary } from "../../../core/collection/Dictionary";
import { IDictionary } from "../../../core/collection/IDictionary";
import { IGui } from "../api/IGui";

interface IGuiState {
    guiMap: IDictionary<string, IGui>;
}

const STATE: IGuiState = {
    guiMap: new Dictionary(),
};

export const setGuiInStore = (gui: IGui) =>
    STATE.guiMap.setValue(gui.guiId, gui);

export const getGuiFromStore = (guiId: string): IGui | undefined =>
    STATE.guiMap.getValue(guiId);
