import { CommandType, ICommand, ICommandType } from "../../../core/command";
import { IAdminActionResponse } from "../core/api/IAdminActionResponse";

/**
 * Name: RunAdminActionOnServerCommand
 * NameSpace: Admin
 * Type: Command
 */
export const RUN_ADMIN_ACTION_ON_SERVER_COMMAND = new CommandType(
    "Admin.RUN_ADMIN_ACTION_ON_SERVER_COMMAND"
);
class CommandClass
    implements
        ICommand<
            RunAdminActionOnServerCommandData,
            RunAdminActionOnServerCommandResultType
        > {
    public type: ICommandType = RUN_ADMIN_ACTION_ON_SERVER_COMMAND;
    public data?: RunAdminActionOnServerCommandData;
}
const instanceOfCommand = new CommandClass();
export const createRunAdminActionOnServerCommand = (
    data: RunAdminActionOnServerCommandData
): ICommand<
    RunAdminActionOnServerCommandData,
    RunAdminActionOnServerCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface RunAdminActionOnServerCommandData {
    action: string;
    data: any;
}
export type RunAdminActionOnServerCommandResultType = Promise<
    IAdminActionResponse
>;
