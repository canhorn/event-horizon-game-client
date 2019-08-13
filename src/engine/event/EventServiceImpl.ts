import { trackEventPublish } from "../debugging/eventTracking/state/EventTrackingState";
import { createLogger } from "../logger/InjectLoggerDecorator";
import { ILogger } from "../logger/LoggerFactory";
import { EventType, IEvent } from "./EventType";
import { IEventListener, IEventService } from "./IEventService";

export class EventServiceImpl implements IEventService {
    private _eventListenerList: Map<string, IEventListener[]> = new Map<
        string,
        IEventListener[]
    >();

    constructor(
        private readonly _logger: ILogger = createLogger("EventService")
    ) {}

    public publish(event: IEvent): void {
        const eventListeners =
            this._eventListenerList.get(event.type.key) || [];
        const len = eventListeners.length;
        for (let index = 0; index < len; index++) {
            const listener = eventListeners[index];
            try {
                listener.function.call(listener.context, event.data);
                trackEventPublish(event.type.key);
            } catch (ex) {
                this._logger.error("Listener failed", ex);
            }
        }
    }

    public addEventListener(
        type: EventType,
        eventListener: (data: any) => void,
        context: any
    ): IEventService {
        const listenerList = this._eventListenerList.get(type.key) || [];
        listenerList.push({
            function: eventListener,
            context,
        });
        this._eventListenerList.set(type.key, listenerList);

        return this;
    }

    public removeEventListener(
        type: EventType,
        eventListener: (data: any) => void,
        context: any
    ): IEventService {
        this._eventListenerList.set(
            type.key,
            (this._eventListenerList.get(type.key) || []).filter(
                listener =>
                    listener.function !== eventListener ||
                    listener.context !== context
            )
        );
        return this;
    }
}
