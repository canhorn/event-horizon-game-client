import { CommandType, ICommand, ICommandType } from "../../core/command";

/**
 * Name: LocalPlayerActionCommand
 * NameSpace: LocalShim
 * Type: Command
 */
export const LOCAL_PLAYER_ACTION_COMMAND = new CommandType(
    "LocalShim.LOCAL_PLAYER_ACTION_COMMAND"
);
class CommandClass
    implements
        ICommand<
            LocalPlayerActionCommandData,
            LocalPlayerActionCommandResultType
        > {
    type: ICommandType = LOCAL_PLAYER_ACTION_COMMAND;
    data?: LocalPlayerActionCommandData;
}
const instanceOfCommand = new CommandClass();
export const createLocalPlayerActionCommand = (
    data: LocalPlayerActionCommandData
): ICommand<
    LocalPlayerActionCommandData,
    LocalPlayerActionCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface LocalPlayerActionCommandData {
    method: string;
    args: any[];
}
export type LocalPlayerActionCommandResultType = undefined;
