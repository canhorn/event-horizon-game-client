import { CommandType, ICommand, ICommandType } from "../../../core/command";
import { IPlayerZoneDetails } from "../api/IPlayerZoneDetails";

/**
 * Name: RegisterPlayerCommand
 * NameSpace: Player
 * Type: Command
 */
export const REGISTER_PLAYER_COMMAND = new CommandType(
    "Player.REGISTER_PLAYER_COMMAND"
);
class CommandClass
    implements
        ICommand<RegisterPlayerCommandData, RegisterPlayerCommandResultType> {
    public type: ICommandType = REGISTER_PLAYER_COMMAND;
    public data?: RegisterPlayerCommandData;
}
const instanceOfCommand = new CommandClass();
export const createRegisterPlayerCommand = (
    data: RegisterPlayerCommandData
): ICommand<RegisterPlayerCommandData, RegisterPlayerCommandResultType> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface RegisterPlayerCommandData {
    playerDetails: IPlayerZoneDetails;
}
export type RegisterPlayerCommandResultType = undefined;
