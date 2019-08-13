import { ICommand } from "../../command/api/ICommand";
import { ICommandType } from "../../command/api/ICommandType";
import { CommandType } from "../../command/model/CommandType";

/**
 * TODO: Update Name to ShowGuiLayoutCommand
 * Name: ShowLayoutCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const SHOW_LAYOUT_COMMAND = new CommandType(
    "Engine.Gui.SHOW_LAYOUT_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = SHOW_LAYOUT_COMMAND;
    public data?: ShowLayoutCommandData;
}
const instanceOfCommand = new CommandClass();
export const createShowLayoutCommand = (
    data: ShowLayoutCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface ShowLayoutCommandData {
    layoutId: string;
}
