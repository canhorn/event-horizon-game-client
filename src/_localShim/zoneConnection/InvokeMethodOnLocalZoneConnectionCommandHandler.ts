import {
    INVOKE_METHOD_ON_ZONE_CONNECTION_COMMAND,
    InvokeMethodOnZoneConnectionCommandData,
} from '../../client/server/zone/invoke/InvokeMethodOnZoneConnectionCommand';
import { ICommandType } from '../../engine/command/api/ICommandType';
import { ICommandHandler } from '../../engine/command/api/ICommandHandler';
import { ICommandResult } from '../../engine/command/api/ICommandResult';
import { ILogger } from '../../engine/logger/LoggerFactory';
import { createLogger } from '../../engine/logger/InjectLoggerDecorator';
import { createLocalPlayerActionCommand } from '../playerActions/LocalPlayerActionCommand';
import { Inject } from '../../engine/ioc/Create';
import { ICommandService } from '../../engine/command/api/ICommandService';

/**
 * Name: InvokeMethodOnLocalZoneConnectionCommandHandler
 * Type: Command
 */
export class InvokeMethodOnLocalZoneConnectionCommandHandler
    implements ICommandHandler {
    public type: ICommandType = INVOKE_METHOD_ON_ZONE_CONNECTION_COMMAND;
    constructor(
        private readonly _logger: ILogger = createLogger(
            'InvokeMethodOnLocalZoneConnectionCommandHandler'
        ),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}
    public handle({
        method,
        args,
    }: InvokeMethodOnZoneConnectionCommandData): ICommandResult {
        this._logger.debug('Locale Connection Invoke', { method, args });
        if (method === 'PlayerAction') {
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
