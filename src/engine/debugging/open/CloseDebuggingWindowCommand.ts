import { ICommand } from "../../command/api/ICommand";
import { ICommandType } from "../../command/api/ICommandType";
import { CommandType } from "../../command/model/CommandType";

/**
 * Type: CloseDebuggingWindowCommand
 * NameSpace: Engine.Debugging
 * Type: Command
 */
export const CLOSE_DEBUGGING_WINDOW_COMMAND = new CommandType(
    "Engine.Debugging.CLOSE_DEBUGGING_WINDOW_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = CLOSE_DEBUGGING_WINDOW_COMMAND;
    public data?: CloseDebuggingWindowCommandData;
}
const instanceOfCommand = new CommandClass();
export const createCloseDebuggingWindowCommand = (
    data: CloseDebuggingWindowCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface CloseDebuggingWindowCommandData {}
