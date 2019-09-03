import { ICommandHandler } from "../../../core/command";
import { ICommandResult } from "../../../core/command";
import { ICommandType } from "../../../core/command";
import { PlayerEntity } from "../model/PlayerEntity";
import { setClientPlayer } from "../state/PlayerState";
import { RegisterPlayerCommandResultType } from "./RegisterPlayerCommand";
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
    }: RegisterPlayerCommandData): ICommandResult<
        RegisterPlayerCommandResultType
    > {
        setClientPlayer(new PlayerEntity(playerDetails));
        return {
            success: true,
        };
    }
}
