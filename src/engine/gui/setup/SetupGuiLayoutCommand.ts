import { CommandType, ICommand, ICommandType } from "../../../core/command";
import { IGuiLayoutData } from "../api/IGuiLayoutData";

/**
 * Name: SetupGuiLayoutCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const SETUP_GUI_LAYOUT_COMMAND = new CommandType(
    "Engine.Gui.SETUP_GUI_LAYOUT_COMMAND"
);
class CommandClass
    implements
        ICommand<SetupGuiLayoutCommandData, SetupGuiLayoutCommandResultType> {
    public type: ICommandType = SETUP_GUI_LAYOUT_COMMAND;
    public data?: SetupGuiLayoutCommandData;
}
const instanceOfCommand = new CommandClass();
export const createSetupGuiLayoutCommand = (
    data: SetupGuiLayoutCommandData
): ICommand<SetupGuiLayoutCommandData, SetupGuiLayoutCommandResultType> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface SetupGuiLayoutCommandData {
    guiId: string;
    layout: IGuiLayoutData;
    parentControlId?: string;
}
export type SetupGuiLayoutCommandResultType = undefined;
