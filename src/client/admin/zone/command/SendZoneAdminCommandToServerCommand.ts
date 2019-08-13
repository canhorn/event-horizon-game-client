import { ICommand } from "../../../../engine/command/api/ICommand";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { CommandType } from "../../../../engine/command/model/CommandType";
import { IZoneAdminCommand } from "../api/IZoneAdminCommand";

/**
 * Type: SendZoneAdminCommandToServerCommand
 * NameSpace: Admin.Zone
 * Type: Command
 */
export const SEND_ZONE_ADMIN_COMMAND_TO_SERVER_COMMAND = new CommandType(
    "Admin.Zone.SEND_ZONE_ADMIN_COMMAND_TO_SERVER_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = SEND_ZONE_ADMIN_COMMAND_TO_SERVER_COMMAND;
    public data?: SendZoneAdminCommandToServerCommandData;
}
const instanceOfCommand = new CommandClass();
export const createSendZoneAdminCommandToServerCommand = (
    data: SendZoneAdminCommandToServerCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface SendZoneAdminCommandToServerCommandData {
    zoneId: string;
    command: IZoneAdminCommand;
}
