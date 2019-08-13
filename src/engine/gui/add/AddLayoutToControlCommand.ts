import { ICommand } from "../../command/api/ICommand";
import { ICommandType } from "../../command/api/ICommandType";
import { CommandType } from "../../command/model/CommandType";
import { GuiControlLayout } from "../model/GuiControlLayout";
import { GuiRegisteringControl } from "../model/GuiRegisteringControl";
import { GuiTemplate } from "../model/GuiTemplate";

export const ADD_LAYOUT_TO_CONTROL_COMMAND = new CommandType(
    "GUI.ADD_LAYOUT_TO_CONTROL_COMMAND"
);

export class AddLayoutToControlCommand implements ICommand {
    public type: ICommandType = ADD_LAYOUT_TO_CONTROL_COMMAND;
    public data?: AddLayoutToControlCommandData;
}

export interface AddLayoutToControlCommandData {
    targetControlId: string;
    templateList: GuiTemplate[];
    registerControlList: GuiRegisteringControl[];
    layout: GuiControlLayout;
}
