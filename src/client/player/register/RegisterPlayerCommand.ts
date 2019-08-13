import { ICommand } from "../../../engine/command/api/ICommand";
import { ICommandType } from "../../../engine/command/api/ICommandType";
import { CommandType } from "../../../engine/command/model/CommandType";
import { IPlayerZoneDetails } from "../api/IPlayerZoneDetails";

/**
 * Type: RegisterPlayerCommand
 * NameSpace: Player
 * Type: Command
 */
export const REGISTER_PLAYER_COMMAND = new CommandType(
    "Player.REGISTER_PLAYER_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = REGISTER_PLAYER_COMMAND;
    public data?: RegisterPlayerCommandData;
}
const instanceOfCommand = new CommandClass();
export const createRegisterPlayerCommand = (
    data: RegisterPlayerCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface RegisterPlayerCommandData {
    playerDetails: IPlayerZoneDetails;
}
