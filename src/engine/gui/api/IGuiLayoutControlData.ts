import { IGuiGridLocation } from "./IGuiGridLocation";

export interface IGuiLayoutControlData {
    id: string;
    sort: number;
    layer?: number;
    templateId: string;
    options?: any;
    linkWith?: any;
    gridLocation?: IGuiGridLocation;
    controlList?: IGuiLayoutControlData[];
}
