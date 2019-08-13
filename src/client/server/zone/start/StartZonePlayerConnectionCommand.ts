import { ICommand } from "../../../../engine/command/api/ICommand";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { CommandType } from "../../../../engine/command/model/CommandType";

/**
 * Type: StartZonePlayerConnectionCommand
 * NameSpace: Server.Zone
 * Type: Command
 */
export const START_ZONE_PLAYER_CONNECTION_COMMAND = new CommandType(
    "Server.Zone.START_ZONE_PLAYER_CONNECTION_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = START_ZONE_PLAYER_CONNECTION_COMMAND;
    public data?: StartZonePlayerConnectionCommandData;
}
const instanceOfCommand = new CommandClass();
export const createStartZonePlayerConnectionCommand = (
    data: StartZonePlayerConnectionCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface StartZonePlayerConnectionCommandData {}
