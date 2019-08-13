import { ICommand } from "../../command/api/ICommand";
import { CommandType } from "../../command/model/CommandType";
import { InputOptions } from "../InputModel";

export const REGISTER_INPUT_COMMAND = new CommandType(
    "INPUT.REGISTER_INPUT_COMMAND"
);

const registerInputCommand: ICommand = {
    type: REGISTER_INPUT_COMMAND,
};

export const createRegisterInputCommand = (
    data: IRegisterInputCommandData
): ICommand => {
    registerInputCommand.data = data;
    return registerInputCommand;
};

export interface IRegisterInputCommandData extends InputOptions {}
