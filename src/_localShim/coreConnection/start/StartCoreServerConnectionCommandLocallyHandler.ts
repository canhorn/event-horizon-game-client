import {
    START_CORE_SERVER_CONNECTION_COMMAND,
    StartCoreServerConnectionCommandData,
} from "../../../client/server/core/start/StartCoreServerConnectionCommand";
import { createAccountConnectedEvent } from "../../../client/server/core/account/connected/AccountConnectedEvent";
import {
    ICommandHandler,
    ICommandType,
    ICommandResult,
} from "../../../core/command";
import { ILogger, createLogger } from "../../../core/logger";
import { IEventService } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { StartCoreServerConnectionCommandResultType } from "../../../client/server/core/start/StartCoreServerConnectionCommand";

/**
 * Name: StartCoreServerConnectionCommandLocallyHandler
 * Type: Command
 */
export class StartCoreServerConnectionCommandLocallyHandler
    implements ICommandHandler {
    public type: ICommandType = START_CORE_SERVER_CONNECTION_COMMAND;
    constructor(
        private readonly _logger: ILogger = createLogger(
            "StartCoreServerConnectionCommandLocallyHandler"
        ),
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {}
    public handle(
        _: StartCoreServerConnectionCommandData
    ): ICommandResult<StartCoreServerConnectionCommandResultType> {
        const accountInfo = {
            player: { username: "test-user", locale: "en-us" },
        };
        this._logger.debug("Account Info: ", accountInfo);
        this._eventService.publish(
            createAccountConnectedEvent({ accountInfo })
        );
        return {
            success: true,
        };
    }
}
