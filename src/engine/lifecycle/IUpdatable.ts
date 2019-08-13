import { IEntity } from "../entity/api/IEntity";

export abstract class IUpdatable extends IEntity {
    public abstract update(): void;
}
