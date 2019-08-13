import { ICommand } from "../../command/api/ICommand";
import { ICommandType } from "../../command/api/ICommandType";
import { CommandType } from "../../command/model/CommandType";
import { GuiControlOptions } from "../model/GuiControlOptions";

/**
 * Name: UpdateGuiControlCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const UPDATE_GUI_CONTROL_COMMAND = new CommandType(
    "Engine.Gui.UPDATE_GUI_CONTROL_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = UPDATE_GUI_CONTROL_COMMAND;
    public data?: UpdateGuiControlCommandData;
}
const instanceOfCommand = new CommandClass();
export const createUpdateGuiControlCommand = (
    data: UpdateGuiControlCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface UpdateGuiControlCommandData {
    controlId: string;
    options: GuiControlOptions;
}
