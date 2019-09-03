import { GuiControlType } from "../model/GuiControlType";
import { IGuiControlOptions } from "./IGuiControlOptions";
import { IGuiGridLocation } from "./IGuiGridLocation";

export interface IGuiControlTemplate {
    id: string;
    type: GuiControlType;
    gridLocation?: IGuiGridLocation;
    options: IGuiControlOptions;
}
