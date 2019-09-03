import { CommandType, ICommand, ICommandType } from "../../../core/command";

/**
 * Name: DisposeOfGuiCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const DISPOSE_OF_GUI_COMMAND = new CommandType(
    "Engine.Gui.DISPOSE_OF_GUI_COMMAND"
);
class CommandClass
    implements
        ICommand<DisposeOfGuiCommandData, DisposeOfGuiCommandResultType> {
    public type: ICommandType = DISPOSE_OF_GUI_COMMAND;
    public data?: DisposeOfGuiCommandData;
}
const instanceOfCommand = new CommandClass();
export const createDisposeOfGuiCommand = (
    data: DisposeOfGuiCommandData
): ICommand<DisposeOfGuiCommandData, DisposeOfGuiCommandResultType> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface DisposeOfGuiCommandData {
    id: string;
}
export type DisposeOfGuiCommandResultType = undefined;
