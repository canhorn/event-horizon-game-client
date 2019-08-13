import { Dictionary } from '../../../core/collection/Dictionary';
import { IDictionary } from '../../../core/collection/IDictionary';
import { debugEnabled } from '../../debugging/DebuggingActions';
import { IEventListener } from '../../event/IEventService';
import { createLogger } from '../../logger/InjectLoggerDecorator';
import { ILogger } from '../../logger/LoggerFactory';
import { ICommand } from '../api/ICommand';
import { ICommandListener } from '../api/ICommandListener';
import { ICommandResult } from '../api/ICommandResult';
import { ICommandService } from '../api/ICommandService';
import { ICommandType } from '../api/ICommandType';

const SENT_COMMAND_LIST: ICommand[] = [];
// WINDOW: Window/Global assign
(window as any).SENT_COMMAND_LIST = SENT_COMMAND_LIST;

export class CommandService implements ICommandService {
    private _commandListenerList: IDictionary<
        string,
        ICommandListener
    > = new Dictionary<string, ICommandListener>();

    private readonly _logger: ILogger;
    private readonly _debugEnabled: boolean;

    constructor() {
        this._logger = createLogger('CommandService');
        this._debugEnabled = debugEnabled();
    }

    public send(command: ICommand): ICommandResult {
        try {
            SENT_COMMAND_LIST.unshift(command);
            if (this._commandListenerList.containsKey(command.type.key)) {
                const listener = this._commandListenerList.getValue(
                    command.type.key
                ) as IEventListener;
                return listener.function.call(listener.context, command.data);
            }
        } catch (ex) {
            this._logger.error('Error thrown calling Command', ex);
            this._logger.trace('Error thrown calling Command', ex);
        }
        return {
            success: false,
            result: 'command_listener_not_found',
        };
    }

    public addListener(
        type: ICommandType,
        listenerFunction: (data: any) => ICommandResult,
        context: any
    ): ICommandService {
        if (this._debugEnabled) {
            if (this._commandListenerList.containsKey(type.key)) {
                this._logger.error(
                    `Command Type of ${type.key} already exists. The last added listener will override any preceding.`,
                    {
                        code: 'command_type_exists',
                    }
                );
            }
        }
        this._commandListenerList.setValue(type.key, {
            function: listenerFunction,
            context,
        });

        return this;
    }

    public removeListener(
        type: ICommandType,
        listenerFunction: (data: any) => ICommandResult,
        context: any
    ): ICommandService {
        const listener = this._commandListenerList.getValue(type.key);
        if (
            listener &&
            listener.function === listenerFunction &&
            listener.context === context
        ) {
            this._commandListenerList.remove(type.key);
        }
        return this;
    }
}
