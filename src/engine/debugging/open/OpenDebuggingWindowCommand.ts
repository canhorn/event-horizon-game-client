import { CommandType, ICommand, ICommandType } from "../../../core/command";

/**
 * Type: OpenDebuggingWindowCommand
 * NameSpace: Engine.Debugging
 * Type: Command
 */
export const OPEN_DEBUGGING_WINDOW_COMMAND = new CommandType(
    "Engine.Debugging.OPEN_DEBUGGING_WINDOW_COMMAND"
);
class CommandClass
    implements
        ICommand<
            OpenDebuggingWindowCommandData,
            OpenDebuggingWindowCommandResultType
        > {
    public type: ICommandType = OPEN_DEBUGGING_WINDOW_COMMAND;
    public data?: OpenDebuggingWindowCommandData;
}
const instanceOfCommand = new CommandClass();
export const createOpenDebuggingWindowCommand = (
    data: OpenDebuggingWindowCommandData
): ICommand<
    OpenDebuggingWindowCommandData,
    OpenDebuggingWindowCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface OpenDebuggingWindowCommandData {}
export type OpenDebuggingWindowCommandResultType = undefined;
