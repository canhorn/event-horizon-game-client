import { ICommand } from "../../command/api/ICommand";
import { ICommandType } from "../../command/api/ICommandType";
import { CommandType } from "../../command/model/CommandType";

/**
 * Type: OpenDebuggingWindowCommand
 * NameSpace: Engine.Debugging
 * Type: Command
 */
export const OPEN_DEBUGGING_WINDOW_COMMAND = new CommandType(
    "Engine.Debugging.OPEN_DEBUGGING_WINDOW_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = OPEN_DEBUGGING_WINDOW_COMMAND;
    public data?: OpenDebuggingWindowCommandData;
}
const instanceOfCommand = new CommandClass();
export const createOpenDebuggingWindowCommand = (
    data: OpenDebuggingWindowCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface OpenDebuggingWindowCommandData {}
