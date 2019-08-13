import { IObjectServerPosition } from "./IObjectServerPosition";

export interface IObjectEntityDetails {
    id: number;
    position?: IObjectServerPosition;
    data: any;

    [key: string]: any;
}
