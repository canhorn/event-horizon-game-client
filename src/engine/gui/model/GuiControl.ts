import { Mesh } from "babylonjs";
import { Control } from "babylonjs-gui";
import { GuiControlOptions } from "./GuiControlOptions";
import { GuiControlType } from "./GuiControlType";
import { GuiGridLocation } from "./GuiGridLocation";

export interface GuiControl {
    id: string;
    type: GuiControlType;
    isVisible: boolean;
    options: GuiControlOptions;
    control: Control;
    parentId?: string;
    gridLocation?: GuiGridLocation;
    update(options: GuiControlOptions): void;
    dispose(): void;
    addControl(guiControl: GuiControl): void;
    linkWithMesh(mesh: Mesh): void;
}
