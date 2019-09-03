import { CommandType, ICommand, ICommandType } from "../../../../core/command";

/**
 * Name: StopZonePlayerConnectionCommand
 * NameSpace: Server.Zone
 * Type: Command
 */
export const STOP_ZONE_PLAYER_CONNECTION_COMMAND = new CommandType(
    "Server.Zone.STOP_ZONE_PLAYER_CONNECTION_COMMAND"
);
class CommandClass
    implements
        ICommand<
            StopZonePlayerConnectionCommandData,
            StopZonePlayerConnectionCommandResultType
        > {
    public type: ICommandType = STOP_ZONE_PLAYER_CONNECTION_COMMAND;
    public data?: StopZonePlayerConnectionCommandData;
}
const instanceOfCommand = new CommandClass();
export const createStopZonePlayerConnectionCommand = (
    data: StopZonePlayerConnectionCommandData
): ICommand<
    StopZonePlayerConnectionCommandData,
    StopZonePlayerConnectionCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface StopZonePlayerConnectionCommandData {}
export type StopZonePlayerConnectionCommandResultType = undefined;
