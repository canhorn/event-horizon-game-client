import { MoveDirection } from '../../../client/systems/move/model/MoveDirection';
import { ILogger } from '../../../engine/logger/LoggerFactory';
import { createLogger } from '../../../engine/logger/InjectLoggerDecorator';
import { moveEntityDirection } from '../../logic/entityMove/MoveEntityDirection';
import { getClientPlayer } from '../../../client/player/state/PlayerState';
import { isObjectNotDefined } from '../../../core/object/ObjectCheck';

export const localePlayerActionMove = (
    args: any[],
    logger: ILogger = createLogger('localePlayerActionMove')
) => {
    const direction: MoveDirection = args[0];
    const player = getClientPlayer();
    if (isObjectNotDefined(player)) {
        logger.error('Player Not Found.');
        return;
    }
    moveEntityDirection(player, direction);
    // switch (direction) {
    //     case MoveDirection.Forward:
    //         logger.debug('Move Player Forward');
    //         break;
    //     case MoveDirection.Backwards:
    //         logger.debug('Move Player Backwards');
    //         break;
    //     case MoveDirection.Left:
    //         logger.debug('Move Player Left');
    //         break;
    //     case MoveDirection.Right:
    //         logger.debug('Move Player Right');
    //         break;
    // }
};
