import { ICommand } from "../../../engine/command/api/ICommand";
import { ICommandType } from "../../../engine/command/api/ICommandType";
import { CommandType } from "../../../engine/command/model/CommandType";
import { IObjectEntityDetails } from "../api/IObjectEntityDetails";

/**
 * Name: RegisterEntityCommand
 * NameSpace: Entity
 * Type: Command
 */
export const REGISTER_ENTITY_COMMAND = new CommandType(
    "Entity.REGISTER_ENTITY_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = REGISTER_ENTITY_COMMAND;
    public data?: RegisterEntityCommandData;
}
const instanceOfCommand = new CommandClass();
export const createRegisterEntityCommand = (
    data: RegisterEntityCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface RegisterEntityCommandData {
    entityDetails: IObjectEntityDetails;
}
