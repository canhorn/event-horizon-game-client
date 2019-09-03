import { CommandType, ICommand, ICommandType } from "../../../core/command";

/**
 * Type: CloseDebuggingWindowCommand
 * NameSpace: Engine.Debugging
 * Type: Command
 */
export const CLOSE_DEBUGGING_WINDOW_COMMAND = new CommandType(
    "Engine.Debugging.CLOSE_DEBUGGING_WINDOW_COMMAND"
);
class CommandClass
    implements
        ICommand<
            CloseDebuggingWindowCommandData,
            CloseDebuggingWindowCommandResultType
        > {
    public type: ICommandType = CLOSE_DEBUGGING_WINDOW_COMMAND;
    public data?: CloseDebuggingWindowCommandData;
}
const instanceOfCommand = new CommandClass();
export const createCloseDebuggingWindowCommand = (
    data: CloseDebuggingWindowCommandData
): ICommand<
    CloseDebuggingWindowCommandData,
    CloseDebuggingWindowCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface CloseDebuggingWindowCommandData {}
export type CloseDebuggingWindowCommandResultType = undefined;
