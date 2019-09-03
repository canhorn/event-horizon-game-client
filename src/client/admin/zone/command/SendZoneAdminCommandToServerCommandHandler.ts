import { ICommandHandler } from "../../../../core/command";
import { ICommandResult } from "../../../../core/command";
import { ICommandType } from "../../../../core/command";
import { sendCoreAdminAction } from "../state/ZoneAdminConnectionState";
import { SendZoneAdminCommandToServerCommandResultType } from "./SendZoneAdminCommandToServerCommand";
import {
    SEND_ZONE_ADMIN_COMMAND_TO_SERVER_COMMAND,
    SendZoneAdminCommandToServerCommandData,
} from "./SendZoneAdminCommandToServerCommand";

/**
 * Name: SendZoneAdminCommandToServerCommand
 * Type: Command
 */
export class SendZoneAdminCommandToServerCommandHandler
    implements ICommandHandler {
    public type: ICommandType = SEND_ZONE_ADMIN_COMMAND_TO_SERVER_COMMAND;
    constructor() {}
    public handle({
        zoneId,
        command,
    }: SendZoneAdminCommandToServerCommandData): ICommandResult<
        SendZoneAdminCommandToServerCommandResultType
    > {
        return {
            success: true,
            result: sendCoreAdminAction(zoneId, command),
        };
    }
}
