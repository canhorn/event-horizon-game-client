import { ICommand } from "../../../core/command";
import { ICommandType } from "../../../core/command";
import { CommandType } from "../../../core/command";
import { IObjectEntity } from "../api/IObjectEntity";
import { IObjectEntityDetails } from "../api/IObjectEntityDetails";

/**
 * Name: RegisterEntityCommand
 * NameSpace: Entity
 * Type: Command
 */
export const REGISTER_ENTITY_COMMAND = new CommandType(
    "Entity.REGISTER_ENTITY_COMMAND"
);
class CommandClass
    implements
        ICommand<RegisterEntityCommandData, RegisterEntityCommandResultType> {
    public type: ICommandType = REGISTER_ENTITY_COMMAND;
    public data?: RegisterEntityCommandData;
}
const instanceOfCommand = new CommandClass();
export const createRegisterEntityCommand = (
    data: RegisterEntityCommandData
): ICommand<RegisterEntityCommandData, RegisterEntityCommandResultType> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface RegisterEntityCommandData {
    entityDetails: IObjectEntityDetails;
}
export type RegisterEntityCommandResultType =
    | "entity_is_player"
    | IObjectEntity;
