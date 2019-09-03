import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../../core/command";
import { EntityModule } from "../model/EntityModule";
import { getBaseScriptModules } from "../state/EntityScriptModuleState";
import {
    REGISTER_ALL_BASE_MODULES_COMMAND,
    RegisterAllBaseModulesCommandData,
    RegisterAllBaseModulesCommandResultType,
} from "./RegisterAllBaseModulesCommand";

/**
 * Name: RegisterAllBaseModulesCommandHandler
 * Type: Command
 */
export class RegisterAllBaseModulesCommandHandler implements ICommandHandler {
    public type: ICommandType = REGISTER_ALL_BASE_MODULES_COMMAND;
    public handle({
        entity,
    }: RegisterAllBaseModulesCommandData): ICommandResult<
        RegisterAllBaseModulesCommandResultType
    > {
        getBaseScriptModules()
            .map(
                baseEntityScriptModule =>
                    new EntityModule(entity, baseEntityScriptModule)
            )
            .forEach(entityModule =>
                entity.registerModule(entityModule.moduleName, entityModule)
            );
        return {
            success: true,
        };
    }
}
