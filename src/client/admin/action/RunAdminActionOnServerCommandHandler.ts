import { ICommandHandler } from "../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../engine/command/api/ICommandType";
import { sendCoreAdminAction } from "../core/state/CoreAdminConnectionState";
import {
    RUN_ADMIN_ACTION_ON_SERVER_COMMAND,
    RunAdminActionOnServerCommandData,
} from "./RunAdminActionOnServerCommand";

/**
 * Name: RunAdminActionOnServerCommand
 * Type: Command
 */
export class RunAdminActionOnServerCommandHandler implements ICommandHandler {
    public type: ICommandType = RUN_ADMIN_ACTION_ON_SERVER_COMMAND;
    constructor() {}
    public handle({
        action,
        data,
    }: RunAdminActionOnServerCommandData): ICommandResult {
        return {
            success: true,
            result: sendCoreAdminAction(action, data),
        };
    }
}
