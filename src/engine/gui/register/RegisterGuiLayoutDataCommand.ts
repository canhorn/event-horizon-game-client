import { CommandType, ICommand, ICommandType } from "../../../core/command";
import { IGuiLayoutData } from "../api/IGuiLayoutData";

/**
 * Name: RegisterGuiLayoutDataCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const REGISTER_GUI_LAYOUT_DATA_COMMAND = new CommandType(
    "Engine.Gui.REGISTER_GUI_LAYOUT_DATA_COMMAND"
);
class CommandClass
    implements
        ICommand<
            RegisterGuiLayoutDataCommandData,
            RegisterGuiLayoutDataCommandResultType
        > {
    public type: ICommandType = REGISTER_GUI_LAYOUT_DATA_COMMAND;
    public data?: RegisterGuiLayoutDataCommandData;
}
const instanceOfCommand = new CommandClass();
export const createRegisterGuiLayoutDataCommand = (
    data: RegisterGuiLayoutDataCommandData
): ICommand<
    RegisterGuiLayoutDataCommandData,
    RegisterGuiLayoutDataCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface RegisterGuiLayoutDataCommandData {
    layoutData: IGuiLayoutData;
}
export type RegisterGuiLayoutDataCommandResultType = undefined;
