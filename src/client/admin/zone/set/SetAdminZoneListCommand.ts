import { CommandType, ICommand, ICommandType } from "../../../../core/command";
import { IZoneDetails } from "../../../zone/api/IZoneDetails";

/**
 * Name: SetAdminZoneListCommand
 * NameSpace: Admin.Zone
 * Type: Command
 */
export const SET_ADMIN_ZONE_LIST_COMMAND = new CommandType(
    "Admin.Zone.SET_ADMIN_ZONE_LIST_COMMAND"
);
class CommandClass
    implements
        ICommand<
            SetAdminZoneListCommandData,
            SetAdminZoneListCommandResultType
        > {
    public type: ICommandType = SET_ADMIN_ZONE_LIST_COMMAND;
    public data?: SetAdminZoneListCommandData;
}
const instanceOfCommand = new CommandClass();
export const createSetAdminZoneListCommand = (
    data: SetAdminZoneListCommandData
): ICommand<SetAdminZoneListCommandData, SetAdminZoneListCommandResultType> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface SetAdminZoneListCommandData {
    zoneList: IZoneDetails[];
}
export type SetAdminZoneListCommandResultType = undefined;
