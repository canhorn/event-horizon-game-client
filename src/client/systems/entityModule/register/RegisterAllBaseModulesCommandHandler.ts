import { ICommandHandler } from "../../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { EntityModule } from "../model/EntityModule";
import { getBaseScriptModules } from "../state/EntityScriptModuleState";
import {
    REGISTER_ALL_BASE_MODULES_COMMAND,
    RegisterAllBaseModulesCommandData,
} from "./RegisterAllBaseModulesCommand";

/**
 * Name: RegisterAllBaseModulesCommand
 * Type: Command
 */
export class RegisterAllBaseModulesCommandHandler implements ICommandHandler {
    public type: ICommandType = REGISTER_ALL_BASE_MODULES_COMMAND;
    constructor() {}
    public handle({
        entity,
    }: RegisterAllBaseModulesCommandData): ICommandResult {
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
