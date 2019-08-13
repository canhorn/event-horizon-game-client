import { ICommand } from "../../command/api/ICommand";
import { ICommandType } from "../../command/api/ICommandType";
import { CommandType } from "../../command/model/CommandType";
import { GuiControlLayout, GuiTemplate } from "../model";

/**
 * Type: CreateGuiCommand
 * NameSpace: Gui
 * Type: Command
 */
export const CREATE_GUI_COMMAND = new CommandType("Gui.CREATE_GUI_COMMAND");
export class CommandClass implements ICommand {
    public type: ICommandType = CREATE_GUI_COMMAND;
    public data?: CreateGuiCommandData;
}
const instanceOfCommand = new CommandClass();
export const createCreateGuiCommand = (
    data: CreateGuiCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface CreateGuiCommandData {
    layoutList: GuiControlLayout[];
    templateList: GuiTemplate[];
}
