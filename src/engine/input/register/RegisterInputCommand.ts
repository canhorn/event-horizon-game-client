import { CommandType, ICommand, ICommandType } from "../../../core/command";
import { InputOptions } from "../InputModel";

/**
 * Name: RegisterInputCommand
 * NameSpace: Engine.Input
 * Type: Command
 */
export const REGISTER_INPUT_COMMAND = new CommandType(
    "Engine.Input.REGISTER_INPUT_COMMAND"
);
class CommandClass
    implements
        ICommand<RegisterInputCommandData, RegisterInputCommandResultType> {
    public type: ICommandType = REGISTER_INPUT_COMMAND;
    public data?: RegisterInputCommandData;
}
const instanceOfCommand = new CommandClass();
export const createRegisterInputCommand = (
    data: RegisterInputCommandData
): ICommand<RegisterInputCommandData, RegisterInputCommandResultType> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface RegisterInputCommandData extends InputOptions {}
export type RegisterInputCommandResultType = undefined;
