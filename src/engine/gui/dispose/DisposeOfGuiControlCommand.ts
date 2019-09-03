import { CommandType, ICommand, ICommandType } from "../../../core/command";

/**
 * Name: DisposeOfGuiControlCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const DISPOSE_OF_GUI_CONTROL_COMMAND = new CommandType(
    "Engine.Gui.DISPOSE_OF_GUI_CONTROL_COMMAND"
);
class CommandClass
    implements
        ICommand<
            DisposeOfGuiControlCommandData,
            DisposeOfGuiControlCommandResultType
        > {
    public type: ICommandType = DISPOSE_OF_GUI_CONTROL_COMMAND;
    public data?: DisposeOfGuiControlCommandData;
}
const instanceOfCommand = new CommandClass();
export const createDisposeOfGuiControlCommand = (
    data: DisposeOfGuiControlCommandData
): ICommand<
    DisposeOfGuiControlCommandData,
    DisposeOfGuiControlCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface DisposeOfGuiControlCommandData {
    guiId: string;
    controlId: string;
}
export type DisposeOfGuiControlCommandResultType = undefined;
