import { ICommand } from "../../../../engine/command/api/ICommand";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { CommandType } from "../../../../engine/command/model/CommandType";
import { IPlayerEntity } from "../../../player/api/IPlayerEntity";

/**
 * Type: RegisterAllPlayerModulesCommand
 * NameSpace: System.EventModule
 * Type: Command
 */
export const REGISTER_ALL_PLAYER_MODULES_COMMAND = new CommandType(
    "System.EventModule.REGISTER_ALL_PLAYER_MODULES_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = REGISTER_ALL_PLAYER_MODULES_COMMAND;
    public data?: RegisterAllPlayerModulesCommandData;
}
const instanceOfCommand = new CommandClass();
export const createRegisterAllPlayerModulesCommand = (
    data: RegisterAllPlayerModulesCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface RegisterAllPlayerModulesCommandData {
    playerEntity: IPlayerEntity;
}
