import {
    LocalPlayerActionCommandData,
    LOCAL_PLAYER_ACTION_COMMAND,
} from './LocalPlayerActionCommand';
import { ICommandHandler } from '../../engine/command/api/ICommandHandler';
import { ICommandType } from '../../engine/command/api/ICommandType';
import { ICommandResult } from '../../engine/command/api/ICommandResult';
import { localePlayerActionMove } from './move/LocalePlayerActionMove';

/**
 * Name: LocalPlayerActionCommandHandler
 * Type: Command
 */
export class LocalPlayerActionCommandHandler implements ICommandHandler {
    public type: ICommandType = LOCAL_PLAYER_ACTION_COMMAND;
    constructor() {}
    public handle({
        method,
        args,
    }: LocalPlayerActionCommandData): ICommandResult {
        console.log({ method, args });
        switch (method) {
            case 'Move':
                localePlayerActionMove(args);
                break;
        }
        return {
            success: true,
        };
    }
}
