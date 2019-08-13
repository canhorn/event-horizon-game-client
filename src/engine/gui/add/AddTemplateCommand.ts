import { ICommand } from "../../command/api/ICommand";
import { ICommandType } from "../../command/api/ICommandType";
import { CommandType } from "../../command/model/CommandType";
import { GuiTemplate } from "../model/GuiTemplate";

export const ADD_TEMPLATE_COMMAND = new CommandType("GUI.ADD_TEMPLATE_COMMAND");

export class AddTemplateCommand implements ICommand {
    public type: ICommandType = ADD_TEMPLATE_COMMAND;
    public data?: AddTemplateCommandData;
}

const addTemplateCommand = new AddTemplateCommand();

export const addGuiTemplateCommand = (data: AddTemplateCommandData) => {
    addTemplateCommand.data = data;
    return addTemplateCommand;
};

export interface AddTemplateCommandData {
    template: GuiTemplate;
}
