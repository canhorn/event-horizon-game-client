import { EventType, IEvent, IEventType } from "../../../../event/EventType";
import { IClientEntityInstance } from "../api/IClientEntityInstance";

/**
 * Type: ClientEntityInstanceRegisteredEvent
 * NameSpace: Engine.System.Client.EntityInstance
 * Type: Event
 */
export const CLIENT_ENTITY_INSTANCE_REGISTERED_EVENT = new EventType(
    "Engine.System.Client.EntityInstance.CLIENT_ENTITY_INSTANCE_REGISTERED_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = CLIENT_ENTITY_INSTANCE_REGISTERED_EVENT;
    public data?: ClientEntityInstanceRegisteredEventData;
}
const instanceOfEvent = new EventClass();
export const createClientEntityInstanceRegisteredEvent = (
    data: ClientEntityInstanceRegisteredEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface ClientEntityInstanceRegisteredEventData {
    clientEntityInstance: IClientEntityInstance;
}
