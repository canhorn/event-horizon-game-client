import { CommandType } from "../../../../engine/command/model/CommandType";

import { ICommand } from "../../../../engine/command/api/ICommand";

import { ICommandType } from "../../../../engine/command/api/ICommandType";

/**
 * Type: StartCoreServerConnectionCommand
 * NameSpace: ServerCore
 * Type: Command
 */
export const START_CORE_SERVER_CONNECTION_COMMAND = new CommandType(
    "ServerCore.START_CORE_SERVER_CONNECTION_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = START_CORE_SERVER_CONNECTION_COMMAND;
    public data?: StartCoreServerConnectionCommandData;
}
const instanceOfCommand = new CommandClass();
export const createStartCoreServerConnectionCommand = (
    data: StartCoreServerConnectionCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface StartCoreServerConnectionCommandData {}
