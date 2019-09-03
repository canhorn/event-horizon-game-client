import { ICommand } from "../../../../core/command";
import { ICommandType } from "../../../../core/command";
import { CommandType } from "../../../../core/command";

/**
 * Name: StartAdminCoreServerConnectionCommand
 * NameSpace: Admin.Core
 * Type: Command
 */
export const START_ADMIN_CORE_SERVER_CONNECTION_COMMAND = new CommandType(
    "Admin.Core.START_ADMIN_CORE_SERVER_CONNECTION_COMMAND"
);
class CommandClass
    implements
        ICommand<
            StartAdminCoreServerConnectionCommandData,
            StartAdminCoreServerConnectionCommandResultType
        > {
    public type: ICommandType = START_ADMIN_CORE_SERVER_CONNECTION_COMMAND;
    public data?: StartAdminCoreServerConnectionCommandData;
}
const instanceOfCommand = new CommandClass();
export const createStartAdminCoreServerConnectionCommand = (
    data: StartAdminCoreServerConnectionCommandData
): ICommand<
    StartAdminCoreServerConnectionCommandData,
    StartAdminCoreServerConnectionCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface StartAdminCoreServerConnectionCommandData {
    serverUrl: string;
    accessToken: string;
}
export type StartAdminCoreServerConnectionCommandResultType = undefined;
