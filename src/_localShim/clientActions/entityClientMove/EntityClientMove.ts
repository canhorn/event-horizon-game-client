import { CLIENT_ACTION_ENTITY_MOVE_EVENT } from '../../../client/action/api/ClientActions';
import { Vector3 } from 'babylonjs';
import { IEventService } from '../../../engine/event/IEventService';
import { Inject } from '../../../engine/ioc/Create';

export const entityClientMove = (
    entityId: number,
    moveTo: Vector3,
    eventService: IEventService = Inject(IEventService)
) => {
    // TODO: Validate still in level area
    eventService.publish({
        type: CLIENT_ACTION_ENTITY_MOVE_EVENT,
        data: {
            entityId,
            moveTo,
        },
    });
};
