import { CommandType, ICommand, ICommandType } from "../../../../core/command";

/**
 * Name: InvokeMethodOnZoneConnectionCommand
 * NameSpace: Server.Zone
 * Type: Command
 */
export const INVOKE_METHOD_ON_ZONE_CONNECTION_COMMAND = new CommandType(
    "Server.Zone.INVOKE_METHOD_ON_ZONE_CONNECTION_COMMAND"
);
class CommandClass
    implements
        ICommand<
            InvokeMethodOnZoneConnectionCommandData,
            InvokeMethodOnZoneConnectionCommandResultType
        > {
    public type: ICommandType = INVOKE_METHOD_ON_ZONE_CONNECTION_COMMAND;
    public data?: InvokeMethodOnZoneConnectionCommandData;
}
const instanceOfCommand = new CommandClass();
export const createInvokeMethodOnZoneConnectionCommand = (
    data: InvokeMethodOnZoneConnectionCommandData
): ICommand<
    InvokeMethodOnZoneConnectionCommandData,
    InvokeMethodOnZoneConnectionCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface InvokeMethodOnZoneConnectionCommandData {
    method: string;
    args: any[];
}
export type InvokeMethodOnZoneConnectionCommandResultType = undefined;
