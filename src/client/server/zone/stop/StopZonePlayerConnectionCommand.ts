import { ICommand } from "../../../../engine/command/api/ICommand";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { CommandType } from "../../../../engine/command/model/CommandType";

/**
 * Type: StopZonePlayerConnectionCommand
 * NameSpace: Server.Zone
 * Type: Command
 */
export const STOP_ZONE_PLAYER_CONNECTION_COMMAND = new CommandType(
    "Server.Zone.STOP_ZONE_PLAYER_CONNECTION_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = STOP_ZONE_PLAYER_CONNECTION_COMMAND;
    public data?: StopZonePlayerConnectionCommandData;
}
const instanceOfCommand = new CommandClass();
export const createStopZonePlayerConnectionCommand = (
    data: StopZonePlayerConnectionCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface StopZonePlayerConnectionCommandData {}
