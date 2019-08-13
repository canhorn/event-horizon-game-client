import { IModule } from "../../../../engine/module/IModule";
import { IState } from "./IState";

/**
 * Name: State
 * For: Entity
 */
export const STATE_MODULE_NAME = "STATE_MODULE_NAME";
export interface IStateModule extends IModule {
    size: number;
    add(state: IState): void;
    addPriority(state: IState): void;
    update(): void;
    clear(): void;
}
