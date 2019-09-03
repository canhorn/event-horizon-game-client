import { checkPropTypes } from "prop-types";
import { ICommand } from "../../../../core/command";
import { ICommandType } from "../../../../core/command";
import { CommandType } from "../../../../core/command";
import { IPlayerEntity } from "../../../player/api/IPlayerEntity";

/**
 * Name: RegisterAllPlayerModulesCommand
 * NameSpace: System.EventModule
 * Type: Command
 */
export const REGISTER_ALL_PLAYER_MODULES_COMMAND = new CommandType(
    "System.EventModule.REGISTER_ALL_PLAYER_MODULES_COMMAND"
);
class CommandClass
    implements
        ICommand<
            RegisterAllPlayerModulesCommandData,
            RegisterAllPlayerModulesCommandResultType
        > {
    public type: ICommandType = REGISTER_ALL_PLAYER_MODULES_COMMAND;
    public data?: RegisterAllPlayerModulesCommandData;
}
const instanceOfCommand = new CommandClass();
export const createRegisterAllPlayerModulesCommand = (
    data: RegisterAllPlayerModulesCommandData
): ICommand<
    RegisterAllPlayerModulesCommandData,
    RegisterAllPlayerModulesCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface RegisterAllPlayerModulesCommandData {
    playerEntity: IPlayerEntity;
}
export type RegisterAllPlayerModulesCommandResultType = undefined;
