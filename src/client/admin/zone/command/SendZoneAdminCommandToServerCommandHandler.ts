import { ICommandHandler } from "../../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { sendCoreAdminAction } from "../state/ZoneAdminConnectionState";
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
    }: SendZoneAdminCommandToServerCommandData): ICommandResult {
        return {
            success: true,
            result: sendCoreAdminAction(zoneId, command),
        };
    }
}
