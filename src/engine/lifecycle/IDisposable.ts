import { IEntity } from "../entity/api/IEntity";

export abstract class IDisposable extends IEntity {
    public abstract dispose(): void;
}
