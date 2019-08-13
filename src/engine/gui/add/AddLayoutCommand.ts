import { ICommand } from "../../command/api/ICommand";
import { ICommandType } from "../../command/api/ICommandType";
import { CommandType } from "../../command/model/CommandType";
import { GuiControlLayout } from "../model/GuiControlLayout";

export const ADD_LAYOUT_COMMAND = new CommandType("GUI.ADD_LAYOUT_COMMAND");

export class AddLayoutCommand implements ICommand {
    public type: ICommandType = ADD_LAYOUT_COMMAND;
    public data?: AddLayoutCommandData;
}

const addLayoutCommand = new AddLayoutCommand();

export const addGuiLayoutCommand = (data: AddLayoutCommandData) => {
    addLayoutCommand.data = data;
    return addLayoutCommand;
};

export interface AddLayoutCommandData {
    layout: GuiControlLayout;
}
