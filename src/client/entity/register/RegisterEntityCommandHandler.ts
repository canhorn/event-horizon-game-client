import { ICommandHandler } from "../../../core/command";
import { ICommandResult } from "../../../core/command";
import { ICommandType } from "../../../core/command";
import { getClientPlayer } from "../../player/state/PlayerState";
import { ObjectEntity } from "../model/ObjectEntity";
import { RegisterEntityCommandResultType } from "./RegisterEntityCommand";
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
    }: RegisterEntityCommandData): ICommandResult<
        RegisterEntityCommandResultType
    > {
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
