import { ICommand } from "../../../../engine/command/api/ICommand";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { CommandType } from "../../../../engine/command/model/CommandType";

/**
 * Type: StartAdminCoreServerConnectionCommand
 * NameSpace: Admin.Core
 * Type: Command
 */
export const START_ADMIN_CORE_SERVER_CONNECTION_COMMAND = new CommandType(
    "Admin.Core.START_ADMIN_CORE_SERVER_CONNECTION_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = START_ADMIN_CORE_SERVER_CONNECTION_COMMAND;
    public data?: StartAdminCoreServerConnectionCommandData;
}
const instanceOfCommand = new CommandClass();
export const createStartAdminCoreServerConnectionCommand = (
    data: StartAdminCoreServerConnectionCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface StartAdminCoreServerConnectionCommandData {
    serverUrl: string;
    accessToken: string;
}
