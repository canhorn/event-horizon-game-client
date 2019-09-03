import {
    EventType,
    IEventHandler,
    IEventService,
    IEventType,
} from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { createLogger, ILogger } from "../../../core/logger";
import {
    CLIENT_ACTION_RECEIVED_EVENT,
    ClientActionReceivedEventData,
} from "../../server/zone/action/ClientActionReceivedEvent";

/**
 * Event Name: ClientActionReceivedEvent
 * Type: Event
 */
export class ClientActionReceivedEventHandler implements IEventHandler {
    public type: IEventType = CLIENT_ACTION_RECEIVED_EVENT;
    constructor(
        private readonly _logger: ILogger = createLogger(
            "ClientActionReceivedEventHandler"
        ),
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {}
    public handle({ action, data }: ClientActionReceivedEventData): void {
        this._eventService.publish({
            type: new EventType(action),
            data,
        });
    }
}
