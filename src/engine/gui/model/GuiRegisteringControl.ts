import { GuiControlOptions } from "./GuiControlOptions";
import { GuiGridLocation } from "./GuiGridLocation";
export interface GuiRegisteringControl {
    controlId: string;
    templateId: string;
    options?: GuiControlOptions;
    gridLocation?: GuiGridLocation;
}
