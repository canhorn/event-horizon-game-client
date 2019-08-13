import { ICommandHandler } from "../../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { stopZonePlayerConnection } from "../state/ZoneConnectionState";
import { STOP_ZONE_PLAYER_CONNECTION_COMMAND } from "./StopZonePlayerConnectionCommand";

/**
/* Name: StopCoreServerConnectionCommand
/* Type: Command
 */
export class StopZonePlayerConnectionCommandHandler implements ICommandHandler {
    public type: ICommandType = STOP_ZONE_PLAYER_CONNECTION_COMMAND;
    constructor() {}
    public handle(): ICommandResult {
        stopZonePlayerConnection();

        return {
            success: true,
        };
    }
}
