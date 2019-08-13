import { ICommand } from "../../../engine/command/api/ICommand";
import { ICommandType } from "../../../engine/command/api/ICommandType";
import { CommandType } from "../../../engine/command/model/CommandType";

/**
 * Type: RunAdminActionOnServerCommand
 * NameSpace: Admin.Action
 * Type: Command
 */
export const RUN_ADMIN_ACTION_ON_SERVER_COMMAND = new CommandType(
    "Admin.Action.RUN_ADMIN_ACTION_ON_SERVER_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = RUN_ADMIN_ACTION_ON_SERVER_COMMAND;
    public data?: RunAdminActionOnServerCommandData;
}
const instanceOfCommand = new CommandClass();
export const createRunAdminActionOnServerCommand = (
    data: RunAdminActionOnServerCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface RunAdminActionOnServerCommandData {
    action: string;
    data: any;
}
