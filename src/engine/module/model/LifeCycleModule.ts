import { Entity } from "../../entity/model/Entity";
import { IModule } from "../IModule";

export abstract class LifeCycleModule extends Entity implements IModule {
    constructor() {
        super();
    }
    public abstract update(): void;
    public abstract dispose(): void;
}
