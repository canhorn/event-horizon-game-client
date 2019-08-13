import { GuiControlOptions } from "./GuiControlOptions";
import { GuiControlType } from "./GuiControlType";
import { GuiGridLocation } from "./GuiGridLocation";
export interface GuiTemplate {
    id: string;
    type: GuiControlType;
    gridLocation?: GuiGridLocation;
    options: GuiControlOptions;
}
