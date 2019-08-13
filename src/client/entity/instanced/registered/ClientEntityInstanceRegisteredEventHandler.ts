import { IEventType } from "../../../../engine/event/EventType";
import { IEventHandler } from "../../../../engine/event/IEventService";
import {
    CLIENT_ENTITY_INSTANCE_REGISTERED_EVENT,
    ClientEntityInstanceRegisteredEventData,
} from "../../../../engine/system/client/entityInstance/register/ClientEntityInstanceRegisteredEvent";
import { ClientEntityInstanced } from "../model/ClientEntityInstanced";

/**
 * Event Name: ClientEntityInstanceRegisteredEvent
 * Type: Event
 */
export class ClientEntityInstanceRegisteredEventHandler
    implements IEventHandler {
    public type: IEventType = CLIENT_ENTITY_INSTANCE_REGISTERED_EVENT;
    constructor() {}
    public handle({
        clientEntityInstance,
    }: ClientEntityInstanceRegisteredEventData): void {
        new ClientEntityInstanced(clientEntityInstance);
    }
}
