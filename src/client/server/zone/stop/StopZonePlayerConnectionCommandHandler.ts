import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../../core/command";
import { stopZonePlayerConnection } from "../state/ZoneConnectionState";
import {
    STOP_ZONE_PLAYER_CONNECTION_COMMAND,
    StopZonePlayerConnectionCommandResultType,
} from "./StopZonePlayerConnectionCommand";

/**
 * Name: StopCoreServerConnectionCommand
 * Type: Command
 */
export class StopZonePlayerConnectionCommandHandler implements ICommandHandler {
    public type: ICommandType = STOP_ZONE_PLAYER_CONNECTION_COMMAND;
    public handle(): ICommandResult<StopZonePlayerConnectionCommandResultType> {
        stopZonePlayerConnection();

        return {
            success: true,
        };
    }
}
