import { IEntity } from "../../../engine/entity/api/IEntity";

export interface ITrackedEntity extends IEntity {
    tags: string[];
    dispose(): void;
}
