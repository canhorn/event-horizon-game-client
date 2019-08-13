import { IEntity } from "../../entity/api/IEntity";

export abstract class IRegisterService<T extends IEntity> {
    public abstract register(obj: T): void;
    public abstract unregister(obj: T): void;
    public abstract loop(): void;
    public abstract cleanUp(): void;
}
