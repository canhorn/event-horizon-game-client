import { Vector3 } from "babylonjs";
import { IModule } from "../../../engine/module/IModule";
import { IObjectEntityDetails } from "./IObjectEntityDetails";
import { ITrackedEntity } from "./ITrackedEntity";

export interface IObjectEntity extends ITrackedEntity {
    globalId: string;
    entityId: number;
    type: string;
    position: Vector3;
    details: IObjectEntityDetails;
    getProperty<T>(name: string): T;
    setProperty(name: string, property: any): void;
    registerModule(name: string, module: IModule): void;
    equals(obj: any): boolean;
}
