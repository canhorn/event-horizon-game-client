import { ICommand } from "../../command/api/ICommand";
import { ICommandType } from "../../command/api/ICommandType";
import { CommandType } from "../../command/model/CommandType";

/**
 * Name: DisposeOfGuiControlCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const DISPOSE_OF_GUI_CONTROL_COMMAND = new CommandType(
    "Engine.Gui.DISPOSE_OF_GUI_CONTROL_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = DISPOSE_OF_GUI_CONTROL_COMMAND;
    public data?: DisposeOfGuiControlCommandData;
}
const instanceOfCommand = new CommandClass();
export const createDisposeOfGuiControlCommand = (
    data: DisposeOfGuiControlCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface DisposeOfGuiControlCommandData {
    controlId: string;
}
