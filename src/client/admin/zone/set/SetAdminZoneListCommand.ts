import { ICommand } from "../../../../engine/command/api/ICommand";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { CommandType } from "../../../../engine/command/model/CommandType";
import { IZoneDetails } from "../../../zone/api/IZoneDetails";

/**
 * Type: SetAdminZoneListCommand
 * NameSpace: Admin.Zone
 * Type: Command
 */
export const SET_ADMIN_ZONE_LIST_COMMAND = new CommandType(
    "Admin.Zone.SET_ADMIN_ZONE_LIST_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = SET_ADMIN_ZONE_LIST_COMMAND;
    public data?: SetAdminZoneListCommandData;
}
const instanceOfCommand = new CommandClass();
export const createSetAdminZoneListCommand = (
    data: SetAdminZoneListCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface SetAdminZoneListCommandData {
    zoneList: IZoneDetails[];
}
