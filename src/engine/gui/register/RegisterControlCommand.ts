import { ICommand } from "../../command/api/ICommand";
import { ICommandType } from "../../command/api/ICommandType";
import { CommandType } from "../../command/model/CommandType";
import { GuiRegisteringControl } from "../model/GuiRegisteringControl";

export const REGISTER_CONTROL_COMMAND = new CommandType(
    "GUI.REGISTER_CONTROL_COMMAND"
);

export class RegisterControlCommand implements ICommand {
    public type: ICommandType = REGISTER_CONTROL_COMMAND;
    public data?: RegisterControlCommandData;
}

const registerControlCommand = new RegisterControlCommand();

export const registerGuiControlCommand = (data: RegisterControlCommandData) => {
    registerControlCommand.data = data;
    return registerControlCommand;
};

export interface RegisterControlCommandData extends GuiRegisteringControl {}
