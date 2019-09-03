import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../core/command";
import { sendCoreAdminAction } from "../core/state/CoreAdminConnectionState";
import {
    RUN_ADMIN_ACTION_ON_SERVER_COMMAND,
    RunAdminActionOnServerCommandData,
    RunAdminActionOnServerCommandResultType,
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
    }: RunAdminActionOnServerCommandData): ICommandResult<
        RunAdminActionOnServerCommandResultType
    > {
        return {
            success: true,
            result: sendCoreAdminAction(action, data),
        };
    }
}
