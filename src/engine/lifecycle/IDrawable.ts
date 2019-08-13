import { IEntity } from "../entity/api/IEntity";

export abstract class IDrawable extends IEntity {
    public abstract draw(): void;
}
