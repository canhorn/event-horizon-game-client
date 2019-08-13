import { ICommandHandler } from '../../../engine/command/api/ICommandHandler';
import {
    START_CORE_SERVER_CONNECTION_COMMAND,
    StartCoreServerConnectionCommandData,
} from '../../../client/server/core/start/StartCoreServerConnectionCommand';
import { ICommandType } from '../../../engine/command/api/ICommandType';
import { ICommandResult } from '../../../engine/command/api/ICommandResult';
import { createLogger } from '../../../engine/logger/InjectLoggerDecorator';
import { ILogger } from '../../../engine/logger/LoggerFactory';
import { Inject } from '../../../engine/ioc/Create';
import { IEventService } from '../../../engine/event/IEventService';
import { createAccountConnectedEvent } from '../../../client/server/core/account/connected/AccountConnectedEvent';

/**
 * Name: StartCoreServerConnectionCommandLocallyHandler
 * Type: Command
 */
export class StartCoreServerConnectionCommandLocallyHandler
    implements ICommandHandler {
    public type: ICommandType = START_CORE_SERVER_CONNECTION_COMMAND;
    constructor(
        private readonly _logger: ILogger = createLogger(
            'StartCoreServerConnectionCommandLocallyHandler'
        ),
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {}
    public handle(_: StartCoreServerConnectionCommandData): ICommandResult {
        const accountInfo = {
            player: { username: 'test-user', locale: 'en-us' },
        };
        this._logger.debug('Account Info: ', accountInfo);
        this._eventService.publish(
            createAccountConnectedEvent({ accountInfo })
        );
        return {
            success: true,
        };
    }
}
