import { CommandType, ICommand, ICommandType } from "../../../core/command";

/**
 * Name: LinkGuiWithCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const LINK_GUI_WITH_COMMAND = new CommandType(
    "Engine.Gui.LINK_GUI_WITH_COMMAND"
);
class CommandClass
    implements ICommand<LinkGuiWithCommandData, LinkGuiWithCommandResultType> {
    public type: ICommandType = LINK_GUI_WITH_COMMAND;
    public data?: LinkGuiWithCommandData;
}
const instanceOfCommand = new CommandClass();
export const createLinkGuiWithCommand = (
    data: LinkGuiWithCommandData
): ICommand<LinkGuiWithCommandData, LinkGuiWithCommandResultType> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface LinkGuiWithCommandData {
    id: string;
    linkWith: any;
}
export type LinkGuiWithCommandResultType = undefined;
