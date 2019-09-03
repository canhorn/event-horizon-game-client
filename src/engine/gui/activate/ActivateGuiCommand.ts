import { CommandType, ICommand, ICommandType } from "../../../core/command";

/**
 * Name: ActivateGuiCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const ACTIVATE_GUI_COMMAND = new CommandType(
    "Engine.Gui.ACTIVATE_GUI_COMMAND"
);
class CommandClass
    implements ICommand<ActivateGuiCommandData, ActivateGuiCommandResultType> {
    public type: ICommandType = ACTIVATE_GUI_COMMAND;
    public data?: ActivateGuiCommandData;
}
const instanceOfCommand = new CommandClass();
export const createActivateGuiCommand = (
    data: ActivateGuiCommandData
): ICommand<ActivateGuiCommandData, ActivateGuiCommandResultType> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface ActivateGuiCommandData {
    id: string;
}
export type ActivateGuiCommandResultType = undefined;
