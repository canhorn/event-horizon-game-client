import { CommandType, ICommand, ICommandType } from "../../../core/command";
import { IGuiControlData } from "../api/IGuiControlData";

/**
 * Type: CreateGuiCommand
 * NameSpace: Engine.Gui
 * Type: Command
 */
export const CREATE_GUI_COMMAND = new CommandType(
    "Engine.Gui.CREATE_GUI_COMMAND"
);
export class CommandClass
    implements ICommand<CreateGuiCommandData, CreateGuiCommandResultType> {
    public type: ICommandType = CREATE_GUI_COMMAND;
    public data?: CreateGuiCommandData;
}
const instanceOfCommand = new CommandClass();
export const createCreateGuiCommand = (
    data: CreateGuiCommandData
): ICommand<CreateGuiCommandData, CreateGuiCommandResultType> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface CreateGuiCommandData {
    id: string;
    layoutId: string;
    controlDataList?: IGuiControlData[];
    parentControlId?: string;
}

export type CreateGuiCommandResultType =
    | "invalid_command_data"
    | "layout_data_not_registered"
    | undefined;
