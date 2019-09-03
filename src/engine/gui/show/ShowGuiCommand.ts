import { CommandType, ICommand, ICommandType } from "../../../core/command";

/**
 * Name: ShowGuiCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const SHOW_GUI_COMMAND = new CommandType("Engine.Gui.SHOW_GUI_COMMAND");
class CommandClass
    implements ICommand<ShowGuiCommandData, ShowGuiCommandResultType> {
    public type: ICommandType = SHOW_GUI_COMMAND;
    public data?: ShowGuiCommandData;
}
const instanceOfCommand = new CommandClass();
export const createShowGuiCommand = (
    data: ShowGuiCommandData
): ICommand<ShowGuiCommandData, ShowGuiCommandResultType> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface ShowGuiCommandData {
    id: string;
}
export type ShowGuiCommandResultType = undefined;
