import { CommandType, ICommand, ICommandType } from "../../../../core/command";

/**
 * Name: StartZonePlayerConnectionCommand
 * NameSpace: Server.Zone
 * Type: Command
 */
export const START_ZONE_PLAYER_CONNECTION_COMMAND = new CommandType(
    "Server.Zone.START_ZONE_PLAYER_CONNECTION_COMMAND"
);
class CommandClass
    implements
        ICommand<
            StartZonePlayerConnectionCommandData,
            StartZonePlayerConnectionCommandResultType
        > {
    public type: ICommandType = START_ZONE_PLAYER_CONNECTION_COMMAND;
    public data?: StartZonePlayerConnectionCommandData;
}
const instanceOfCommand = new CommandClass();
export const createStartZonePlayerConnectionCommand = (
    data: StartZonePlayerConnectionCommandData
): ICommand<
    StartZonePlayerConnectionCommandData,
    StartZonePlayerConnectionCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface StartZonePlayerConnectionCommandData {}
export type StartZonePlayerConnectionCommandResultType = undefined;
