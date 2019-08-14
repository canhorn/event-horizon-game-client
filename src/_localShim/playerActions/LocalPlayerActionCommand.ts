import { CommandType } from '../../engine/command/model/CommandType';
import { ICommand } from '../../engine/command/api/ICommand';
import { ICommandType } from '../../engine/command/api/ICommandType';

/**
 * Name: LocalPlayerActionCommand
 * NameSpace: LocalShim
 * Type: Command
 */
export const LOCAL_PLAYER_ACTION_COMMAND = new CommandType(
    'LocalShim.LOCAL_PLAYER_ACTION_COMMAND'
);
class CommandClass implements ICommand {
    type: ICommandType = LOCAL_PLAYER_ACTION_COMMAND;
    data?: LocalPlayerActionCommandData;
}
const instanceOfCommand = new CommandClass();
export const createLocalPlayerActionCommand = (
    data: LocalPlayerActionCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface LocalPlayerActionCommandData {
    method: string;
    args: any[];
}
