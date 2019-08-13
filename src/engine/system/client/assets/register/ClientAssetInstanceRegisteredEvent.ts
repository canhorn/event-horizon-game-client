import { EventType, IEvent, IEventType } from "../../../../event/EventType";
import { IClientAssetInstance } from "../api/IClientAssetInstance";

/**
 * Type: ClientAssetInstanceRegisteredEvent
 * NameSpace: Engine.System.Client.Assets
 * Type: Event
 */
export const CLIENT_ASSET_INSTANCE_REGISTERED_EVENT = new EventType(
    "Engine.System.Client.Assets.CLIENT_ASSET_INSTANCE_REGISTERED_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = CLIENT_ASSET_INSTANCE_REGISTERED_EVENT;
    public data?: ClientAssetInstanceRegisteredEventData;
}
const instanceOfEvent = new EventClass();
export const createClientAssetInstanceRegisteredEvent = (
    data: ClientAssetInstanceRegisteredEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface ClientAssetInstanceRegisteredEventData {
    clientAssetInstance: IClientAssetInstance;
}
