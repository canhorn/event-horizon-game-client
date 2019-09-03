import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../../core/command";
import { EntityModule } from "../model/EntityModule";
import { getPlayerScriptModules } from "../state/EntityScriptModuleState";
import {
    REGISTER_ALL_PLAYER_MODULES_COMMAND,
    RegisterAllPlayerModulesCommandData,
    RegisterAllPlayerModulesCommandResultType,
} from "./RegisterAllPlayerModulesCommand";

/**
 * Name: RegisterAllPlayerModulesCommand
 * Type: Command
 */
export class RegisterAllPlayerModulesCommandHandler implements ICommandHandler {
    public type: ICommandType = REGISTER_ALL_PLAYER_MODULES_COMMAND;
    constructor() {}
    public handle({
        playerEntity,
    }: RegisterAllPlayerModulesCommandData): ICommandResult<
        RegisterAllPlayerModulesCommandResultType
    > {
        getPlayerScriptModules()
            .map(
                baseEntityScriptModule =>
                    new EntityModule(playerEntity, baseEntityScriptModule)
            )
            .forEach(entityModule =>
                playerEntity.registerModule(
                    entityModule.moduleName,
                    entityModule
                )
            );
        return {
            success: true,
        };
    }
}
