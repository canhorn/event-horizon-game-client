import { CommandType, ICommand, ICommandType } from "../../../core/command";

/**
 * Name: DisposeOfGuiControlChildrenCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const DISPOSE_OF_GUI_CONTROL_CHILDREN_COMMAND = new CommandType(
    "Engine.Gui.DISPOSE_OF_GUI_CONTROL_CHILDREN_COMMAND"
);
class CommandClass
    implements
        ICommand<
            DisposeOfGuiControlChildrenCommandData,
            DisposeOfGuiControlChildrenCommandResultType
        > {
    public type: ICommandType = DISPOSE_OF_GUI_CONTROL_CHILDREN_COMMAND;
    public data?: DisposeOfGuiControlChildrenCommandData;
}
const instanceOfCommand = new CommandClass();
export const createDisposeOfGuiControlChildrenCommand = (
    data: DisposeOfGuiControlChildrenCommandData
): ICommand<
    DisposeOfGuiControlChildrenCommandData,
    DisposeOfGuiControlChildrenCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface DisposeOfGuiControlChildrenCommandData {
    controlId: string;
}
export type DisposeOfGuiControlChildrenCommandResultType = undefined;
