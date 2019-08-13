export interface IEventType {
    key: string;
}
export class EventType implements IEventType {
    constructor(public key: string) {}
}

export abstract class IEvent {
    public abstract type: IEventType;
    public abstract data?: any;
}
