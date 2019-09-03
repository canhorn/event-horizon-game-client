import {
    INVOKE_METHOD_ON_ZONE_CONNECTION_COMMAND,
    InvokeMethodOnZoneConnectionCommandData,
} from "../../client/server/zone/invoke/InvokeMethodOnZoneConnectionCommand";
import { createLocalPlayerActionCommand } from "../playerActions/LocalPlayerActionCommand";
import {
    ICommandHandler,
    ICommandType,
    ICommandService,
    ICommandResult,
} from "../../core/command";
import { ILogger, createLogger } from "../../core/logger";
import { Inject } from "../../core/ioc";
import { InvokeMethodOnZoneConnectionCommandResultType } from "../../client/server/zone/invoke/InvokeMethodOnZoneConnectionCommand";

/**
 * Name: InvokeMethodOnLocalZoneConnectionCommandHandler
 * Type: Command
 */
export class InvokeMethodOnLocalZoneConnectionCommandHandler
    implements ICommandHandler {
    public type: ICommandType = INVOKE_METHOD_ON_ZONE_CONNECTION_COMMAND;
    constructor(
        private readonly _logger: ILogger = createLogger(
            "InvokeMethodOnLocalZoneConnectionCommandHandler"
        ),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}
    public handle({
        method,
        args,
    }: InvokeMethodOnZoneConnectionCommandData): ICommandResult<
        InvokeMethodOnZoneConnectionCommandResultType
    > {
        this._logger.debug("Locale Connection Invoke", { method, args });
        if (method === "PlayerAction") {
            this._commandService.send(
                createLocalPlayerActionCommand({
                    method: args[0],
                    args: args.splice(1),
                })
            );
        }
        return {
            success: true,
        };
    }
}
