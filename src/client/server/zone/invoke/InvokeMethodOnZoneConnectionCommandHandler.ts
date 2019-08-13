import { ICommandHandler } from "../../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { invokeMethodOnZonePlayerConnection } from "../state/ZoneConnectionState";
import {
    INVOKE_METHOD_ON_ZONE_CONNECTION_COMMAND,
    InvokeMethodOnZoneConnectionCommandData,
} from "./InvokeMethodOnZoneConnectionCommand";

/**
 * Name: InvokeMethodOnZoneConnectionCommand
 * Type: Command
 */
export class InvokeMethodOnZoneConnectionCommandHandler
    implements ICommandHandler {
    public type: ICommandType = INVOKE_METHOD_ON_ZONE_CONNECTION_COMMAND;
    constructor() {}
    public handle({
        method,
        args,
    }: InvokeMethodOnZoneConnectionCommandData): ICommandResult {
        invokeMethodOnZonePlayerConnection(method, args);
        return {
            success: true,
        };
    }
}
