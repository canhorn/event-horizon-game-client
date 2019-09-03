import { IGuiLayoutControlData } from "./IGuiLayoutControlData";

export interface IGuiLayoutData {
    id: string;
    sort: number;
    controlList: IGuiLayoutControlData[];
    initializeScript?: string;
    activateScript?: string;
    disposeScript?: string;
    updateScript?: string;
    drawScript?: string;
}
