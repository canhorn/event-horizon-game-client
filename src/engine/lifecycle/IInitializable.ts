import { IEntity } from "../entity/api/IEntity";

export abstract class IInitializable extends IEntity {
    public abstract initialize(): void;
    public abstract postInitialize(): void;
}
