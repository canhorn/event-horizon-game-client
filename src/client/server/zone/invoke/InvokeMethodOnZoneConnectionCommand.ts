import { ICommand } from "../../../../engine/command/api/ICommand";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { CommandType } from "../../../../engine/command/model/CommandType";

/**
 * Type: InvokeMethodOnZoneConnectionCommand
 * NameSpace: Server.Zone
 * Type: Command
 */
export const INVOKE_METHOD_ON_ZONE_CONNECTION_COMMAND = new CommandType(
    "Server.Zone.INVOKE_METHOD_ON_ZONE_CONNECTION_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = INVOKE_METHOD_ON_ZONE_CONNECTION_COMMAND;
    public data?: InvokeMethodOnZoneConnectionCommandData;
}
const instanceOfCommand = new CommandClass();
export const createInvokeMethodOnZoneConnectionCommand = (
    data: InvokeMethodOnZoneConnectionCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface InvokeMethodOnZoneConnectionCommandData {
    method: string;
    args: any[];
}
