import { Control } from "babylonjs-gui";
import { GuiControlType } from "../model/GuiControlType";
import { IGuiControlOptions } from "./IGuiControlOptions";
import { IGuiGridLocation } from "./IGuiGridLocation";

export interface IGuiControl {
    id: string;
    type: GuiControlType;
    isVisible: boolean;
    options: IGuiControlOptions;
    control: Control;
    parentId?: string;
    gridLocation?: IGuiGridLocation;
    update(options: IGuiControlOptions): void;
    dispose(): void;
    addControl(guiControl: IGuiControl): void;
    linkWith(obj: any): void;
}
