import { IEntity } from "../entity/api/IEntity";

export abstract class IBeforeRenderable extends IEntity {
    public abstract beforeRender(): void;
}
