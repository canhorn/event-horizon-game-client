import { ICommandHandler } from "../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../engine/command/api/ICommandType";
import { PlayerEntity } from "../model/PlayerEntity";
import { setClientPlayer } from "../state/PlayerState";
import {
    REGISTER_PLAYER_COMMAND,
    RegisterPlayerCommandData,
} from "./RegisterPlayerCommand";

/**
 * Name: RegisterPlayerCommand
 * Type: Command
 */
export class RegisterPlayerCommandHandler implements ICommandHandler {
    public type: ICommandType = REGISTER_PLAYER_COMMAND;
    constructor() {}
    public handle({
        playerDetails,
    }: RegisterPlayerCommandData): ICommandResult {
        setClientPlayer(new PlayerEntity(playerDetails));
        return {
            success: true,
        };
    }
}
