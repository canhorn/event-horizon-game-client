import { CommandType, ICommand, ICommandType } from "../../../../core/command";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";

/**
 * Name: RegisterAllBaseModulesCommand
 * NameSpace: System.EntityModule
 * Type: Command
 */
export const REGISTER_ALL_BASE_MODULES_COMMAND = new CommandType(
    "System.EntityModule.REGISTER_ALL_BASE_MODULES_COMMAND"
);
class CommandClass
    implements
        ICommand<
            RegisterAllBaseModulesCommandData,
            RegisterAllBaseModulesCommandResultType
        > {
    public type: ICommandType = REGISTER_ALL_BASE_MODULES_COMMAND;
    public data?: RegisterAllBaseModulesCommandData;
}
const instanceOfCommand = new CommandClass();
export const createRegisterAllBaseModulesCommand = (
    data: RegisterAllBaseModulesCommandData
): ICommand<
    RegisterAllBaseModulesCommandData,
    RegisterAllBaseModulesCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface RegisterAllBaseModulesCommandData {
    entity: IObjectEntity;
}
export type RegisterAllBaseModulesCommandResultType = undefined;
