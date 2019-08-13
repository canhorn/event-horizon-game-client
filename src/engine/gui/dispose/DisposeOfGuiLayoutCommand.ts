import { ICommand } from "../../command/api/ICommand";
import { ICommandType } from "../../command/api/ICommandType";
import { CommandType } from "../../command/model/CommandType";

/**
 * Name: DisposeOfGuiLayoutCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const DISPOSE_OF_GUI_LAYOUT_COMMAND = new CommandType(
    "Engine.Gui.DISPOSE_OF_GUI_LAYOUT_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = DISPOSE_OF_GUI_LAYOUT_COMMAND;
    public data?: DisposeOfGuiLayoutCommandData;
}
const instanceOfCommand = new CommandClass();
export const createDisposeOfGuiLayoutCommand = (
    data: DisposeOfGuiLayoutCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface DisposeOfGuiLayoutCommandData {
    layoutId: string;
}
