import { CommandType, ICommand, ICommandType } from "../../../../core/command";
import { IZoneAdminCommand } from "../api/IZoneAdminCommand";

/**
 * Name: SendZoneAdminCommandToServerCommand
 * NameSpace: Admin.Zone
 * Type: Command
 */
export const SEND_ZONE_ADMIN_COMMAND_TO_SERVER_COMMAND = new CommandType(
    "Admin.Zone.SEND_ZONE_ADMIN_COMMAND_TO_SERVER_COMMAND"
);
class CommandClass
    implements
        ICommand<
            SendZoneAdminCommandToServerCommandData,
            SendZoneAdminCommandToServerCommandResultType
        > {
    public type: ICommandType = SEND_ZONE_ADMIN_COMMAND_TO_SERVER_COMMAND;
    public data?: SendZoneAdminCommandToServerCommandData;
}
const instanceOfCommand = new CommandClass();
export const createSendZoneAdminCommandToServerCommand = (
    data: SendZoneAdminCommandToServerCommandData
): ICommand<
    SendZoneAdminCommandToServerCommandData,
    SendZoneAdminCommandToServerCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface SendZoneAdminCommandToServerCommandData {
    zoneId: string;
    command: IZoneAdminCommand;
}
export type SendZoneAdminCommandToServerCommandResultType = Promise<void>;
