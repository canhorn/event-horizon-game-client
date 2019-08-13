import { ICommandHandler } from "../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../engine/command/api/ICommandType";
import { getClientPlayer } from "../../player/state/PlayerState";
import { ObjectEntity } from "../model/ObjectEntity";
import {
    REGISTER_ENTITY_COMMAND,
    RegisterEntityCommandData,
} from "./RegisterEntityCommand";

/**
 * Name: RegisterEntityCommand
 * Type: Command
 */
export class RegisterEntityCommandHandler implements ICommandHandler {
    public type: ICommandType = REGISTER_ENTITY_COMMAND;
    constructor() {}
    public handle({
        entityDetails,
    }: RegisterEntityCommandData): ICommandResult {
        const clientPlayer = getClientPlayer();
        if (clientPlayer && entityDetails.id === clientPlayer.entityId) {
            return {
                success: false,
                result: "entity_is_player",
            };
        }
        return {
            success: true,
            result: new ObjectEntity(entityDetails),
        };
    }
}
