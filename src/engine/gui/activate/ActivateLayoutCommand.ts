import { ICommand } from "../../command/api/ICommand";
import { ICommandType } from "../../command/api/ICommandType";
import { CommandType } from "../../command/model/CommandType";

export const ACTIVATE_LAYOUT_COMMAND = new CommandType(
    "GUI.ACTIVATE_LAYOUT_COMMAND"
);

export class ActivateLayoutCommand implements ICommand {
    public type: ICommandType = ACTIVATE_LAYOUT_COMMAND;
    public data?: ActivateLayoutCommandData;
}

const activateLayoutCommand = new ActivateLayoutCommand();

export const activateGuiLayoutCommand = (data: ActivateLayoutCommandData) => {
    activateLayoutCommand.data = data;
    return activateLayoutCommand;
};

export interface ActivateLayoutCommandData {
    layoutId: string;
    parentId?: string;
}
