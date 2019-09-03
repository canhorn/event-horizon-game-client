import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../../core/command";
import { invokeMethodOnZonePlayerConnection } from "../state/ZoneConnectionState";
import {
    INVOKE_METHOD_ON_ZONE_CONNECTION_COMMAND,
    InvokeMethodOnZoneConnectionCommandData,
    InvokeMethodOnZoneConnectionCommandResultType,
} from "./InvokeMethodOnZoneConnectionCommand";

/**
 * Name: InvokeMethodOnZoneConnectionCommand
 * Type: Command
 */
export class InvokeMethodOnZoneConnectionCommandHandler
    implements ICommandHandler {
    public type: ICommandType = INVOKE_METHOD_ON_ZONE_CONNECTION_COMMAND;
    public handle({
        method,
        args,
    }: InvokeMethodOnZoneConnectionCommandData): ICommandResult<
        InvokeMethodOnZoneConnectionCommandResultType
    > {
        invokeMethodOnZonePlayerConnection(method, args);
        return {
            success: true,
        };
    }
}
