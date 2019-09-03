import { CommandType, ICommand, ICommandType } from "../../../core/command";

/**
 * Name: HideGuiCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const HIDE_GUI_COMMAND = new CommandType("Engine.Gui.HIDE_GUI_COMMAND");
class CommandClass
    implements ICommand<HideGuiCommandData, HideGuiCommandResultType> {
    public type: ICommandType = HIDE_GUI_COMMAND;
    public data?: HideGuiCommandData;
}
const instanceOfCommand = new CommandClass();
export const createHideGuiCommand = (
    data: HideGuiCommandData
): ICommand<HideGuiCommandData, HideGuiCommandResultType> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface HideGuiCommandData {
    id: string;
}
export type HideGuiCommandResultType = undefined;
