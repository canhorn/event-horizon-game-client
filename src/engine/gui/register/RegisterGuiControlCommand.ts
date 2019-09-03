import { CommandType, ICommand, ICommandType } from "../../../core/command";
import { IGuiLayoutControlData } from "../api/IGuiLayoutControlData";

/**
 * Name: RegisterGuiControlCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const REGISTER_GUI_CONTROL_COMMAND = new CommandType(
    "Engine.Gui.REGISTER_GUI_CONTROL_COMMAND"
);
class CommandClass
    implements
        ICommand<
            RegisterGuiControlCommandData,
            RegisterGuiControlCommandResultType
        > {
    public type: ICommandType = REGISTER_GUI_CONTROL_COMMAND;
    public data?: RegisterGuiControlCommandData;
}
const instanceOfCommand = new CommandClass();
export const createRegisterGuiControlCommand = (
    data: RegisterGuiControlCommandData
): ICommand<
    RegisterGuiControlCommandData,
    RegisterGuiControlCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface RegisterGuiControlCommandData {
    guiId: string;
    control: IGuiLayoutControlData;
}
export type RegisterGuiControlCommandResultType =
    | "gui_control_already_registered"
    | "gui_control_template_not_found"
    | undefined;
