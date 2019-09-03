import { CommandType, ICommand, ICommandType } from "../../../core/command";
import { IGuiControlData } from "../api/IGuiControlData";

/**
 * Name: UpdateGuiControlCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const UPDATE_GUI_CONTROL_COMMAND = new CommandType(
    "Engine.Gui.UPDATE_GUI_CONTROL_COMMAND"
);
class CommandClass
    implements
        ICommand<
            UpdateGuiControlCommandData,
            UpdateGuiControlCommandResultType
        > {
    public type: ICommandType = UPDATE_GUI_CONTROL_COMMAND;
    public data?: UpdateGuiControlCommandData;
}
const instanceOfCommand = new CommandClass();
export const createUpdateGuiControlCommand = (
    data: UpdateGuiControlCommandData
): ICommand<UpdateGuiControlCommandData, UpdateGuiControlCommandResultType> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface UpdateGuiControlCommandData {
    guiId: string;
    control: IGuiControlData;
}
export type UpdateGuiControlCommandResultType =
    | "gui_control_was_not_found"
    | undefined;
