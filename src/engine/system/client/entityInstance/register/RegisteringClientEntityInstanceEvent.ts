import { EventType, IEvent, IEventType } from "../../../../event/EventType";
import { IClientEntityInstance } from "../api/IClientEntityInstance";

/**
 * Type: RegisteringClientEntityInstanceEvent
 * NameSpace: Engine.System.Client.EntityInstance
 * Type: Event
 */
export const REGISTERING_CLIENT_ENTITY_INSTANCE_EVENT = new EventType(
    "Engine.System.Client.EntityInstance.REGISTERING_CLIENT_ENTITY_INSTANCE_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = REGISTERING_CLIENT_ENTITY_INSTANCE_EVENT;
    public data?: RegisteringClientEntityInstanceEventData;
}
const instanceOfEvent = new EventClass();
export const createRegisteringClientEntityInstanceEvent = (
    data: RegisteringClientEntityInstanceEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface RegisteringClientEntityInstanceEventData {
    clientEntityInstance: IClientEntityInstance;
}
