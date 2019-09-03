import { CommandType, ICommand, ICommandType } from "../../../../core/command";

/**
 * Name: StartCoreServerConnectionCommand
 * NameSpace: Server.Core
 * Type: Command
 */
export const START_CORE_SERVER_CONNECTION_COMMAND = new CommandType(
    "Server.Core.START_CORE_SERVER_CONNECTION_COMMAND"
);
class CommandClass
    implements
        ICommand<
            StartCoreServerConnectionCommandData,
            StartCoreServerConnectionCommandResultType
        > {
    public type: ICommandType = START_CORE_SERVER_CONNECTION_COMMAND;
    public data?: StartCoreServerConnectionCommandData;
}
const instanceOfCommand = new CommandClass();
export const createStartCoreServerConnectionCommand = (
    data: StartCoreServerConnectionCommandData
): ICommand<
    StartCoreServerConnectionCommandData,
    StartCoreServerConnectionCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface StartCoreServerConnectionCommandData {}
export type StartCoreServerConnectionCommandResultType = undefined;
