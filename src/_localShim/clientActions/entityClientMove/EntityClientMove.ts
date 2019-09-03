import { CLIENT_ACTION_ENTITY_MOVE_EVENT } from "../../../client/action/api/ClientActions";
import { Vector3 } from "babylonjs";
import { IEventService } from "../../../core/event";
import { Inject } from "../../../core/ioc";

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
