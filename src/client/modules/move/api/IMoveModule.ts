import { IModule } from "../../../../engine/module/IModule";
import { ClientActionEntityMoveEventData } from "../../../action/api/ClientActions";

/**
 * Name: Move
 * For: Entity
 */
export const MOVE_MODULE_NAME = "MOVE_MODULE_NAME";
export interface IMoveModule extends IModule {
    onMove(data: ClientActionEntityMoveEventData): void;
}
