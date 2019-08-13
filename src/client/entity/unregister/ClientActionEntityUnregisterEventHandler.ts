import { ICommandService } from "../../../engine/command/api/ICommandService";
import { IEventType } from "../../../engine/event/EventType";
import { IEventHandler } from "../../../engine/event/IEventService";
import { Inject } from "../../../engine/ioc/Create";
import {
    CLIENT_ACTION_ENTITY_UNREGISTERED_EVENT,
    ClientActionEntityUnregisterEventData,
} from "../../action/api/ClientActions";
import { createDisposeOfTrackedEntityCommand } from "../tracked/dispose/DisposeOfTrackedEntityCommand";

/**
 * Event Name: ClientActionEntityUnregisterEvent
 * Type: Event
 */
export class ClientActionEntityUnregisterEventHandler implements IEventHandler {
    public type: IEventType = CLIENT_ACTION_ENTITY_UNREGISTERED_EVENT;
    constructor(
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}
    public handle({ entityId }: ClientActionEntityUnregisterEventData): void {
        this._commandService.send(
            createDisposeOfTrackedEntityCommand({ entityId })
        );
    }
}
