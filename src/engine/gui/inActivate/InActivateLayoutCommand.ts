import { ICommand } from "../../command/api/ICommand";
import { ICommandType } from "../../command/api/ICommandType";
import { CommandType } from "../../command/model/CommandType";

export const IN_ACTIVATE_LAYOUT_COMMAND = new CommandType(
    "GUI.IN_ACTIVATE_LAYOUT_COMMAND"
);

export class InActivateLayoutCommand implements ICommand {
    public type: ICommandType = IN_ACTIVATE_LAYOUT_COMMAND;
    public data?: InActivateLayoutCommandData;
}

const inActivateLayoutCommand = new InActivateLayoutCommand();

export const inActivateGuiLayoutCommand = (
    data: InActivateLayoutCommandData
) => {
    inActivateLayoutCommand.data = data;
    return inActivateLayoutCommand;
};

export interface InActivateLayoutCommandData {
    layoutId: string;
}
