import { CommandType, ICommand, ICommandType } from "../../../core/command";

/**
 * Name: AddGuiToParentControlCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const ADD_GUI_TO_PARENT_CONTROL_COMMAND = new CommandType(
    "Engine.Gui.ADD_GUI_TO_PARENT_CONTROL_COMMAND"
);
class CommandClass
    implements
        ICommand<
            AddGuiToParentControlCommandData,
            AddGuiToParentControlCommandResultType
        > {
    public type: ICommandType = ADD_GUI_TO_PARENT_CONTROL_COMMAND;
    public data?: AddGuiToParentControlCommandData;
}
const instanceOfCommand = new CommandClass();
export const createAddGuiToParentControlCommand = (
    data: AddGuiToParentControlCommandData
): ICommand<
    AddGuiToParentControlCommandData,
    AddGuiToParentControlCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface AddGuiToParentControlCommandData {
    id: string;
    layoutId: string;
    parentControlId: string;
}
export type AddGuiToParentControlCommandResultType =
    | "gui_parent_control_not_found"
    | "failed_to_create_child_gui"
    | undefined;
