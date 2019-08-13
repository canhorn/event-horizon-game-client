import { ICommand } from "../../command/api/ICommand";
import { ICommandType } from "../../command/api/ICommandType";
import { CommandType } from "../../command/model/CommandType";

/**
 * TODO: Update Name to HideGuiLayoutCommand
 * Name: HideLayoutCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const HIDE_LAYOUT_COMMAND = new CommandType(
    "Engine.Gui.HIDE_LAYOUT_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = HIDE_LAYOUT_COMMAND;
    public data?: HideLayoutCommandData;
}
const instanceOfCommand = new CommandClass();
export const createHideLayoutCommand = (
    data: HideLayoutCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface HideLayoutCommandData {
    layoutId: string;
}
