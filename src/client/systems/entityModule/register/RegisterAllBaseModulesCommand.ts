import { ICommand } from "../../../../engine/command/api/ICommand";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { CommandType } from "../../../../engine/command/model/CommandType";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";

/**
 * Type: RegisterAllBaseModulesCommand
 * NameSpace: System.EntityModule
 * Type: Command
 */
export const REGISTER_ALL_BASE_MODULES_COMMAND = new CommandType(
    "System.EntityModule.REGISTER_ALL_BASE_MODULES_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = REGISTER_ALL_BASE_MODULES_COMMAND;
    public data?: RegisterAllBaseModulesCommandData;
}
const instanceOfCommand = new CommandClass();
export const createRegisterAllBaseModulesCommand = (
    data: RegisterAllBaseModulesCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface RegisterAllBaseModulesCommandData {
    entity: IObjectEntity;
}
