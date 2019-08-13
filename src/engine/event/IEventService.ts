import { EventType, IEvent, IEventType } from "./EventType";

// TODO: [MODEL] Move to model/api folder
export abstract class IEventService {
    public abstract publish(event: IEvent): void;
    public abstract addEventListener(
        type: EventType,
        eventListener: (data: any) => void,
        context: any
    ): IEventService;
    public abstract removeEventListener(
        type: EventType,
        eventListener: (data: any) => void,
        context: any
    ): IEventService;
}
export abstract class IEventHandlerRegister {
    public abstract register(handler: new () => IEventHandler): void;
    public abstract dispose(): void;
}
export abstract class IEventListener {
    public abstract function: (data: any) => any;
    public abstract context: Object;
}
export abstract class IEventHandler {
    public abstract type: IEventType;
    public abstract handle: (data: any) => void;
}
