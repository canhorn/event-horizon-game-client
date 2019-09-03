import {
    IEventHandler,
    IEventService,
    IEventType,
} from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { createLogger, ILogger } from "../../../../core/logger";
import {
    CLIENT_ACTION_RECEIVED_EVENT,
    ClientActionReceivedEventData,
} from "../../../server/zone/action/ClientActionReceivedEvent";
import { incrementClientAction } from "./state/ClientActionsState";

/**
 * Event Name: TrackClientActionsPerSecondHandler
 * Type: Event
 */
export class TrackClientActionsPerSecondHandler implements IEventHandler {
    public type: IEventType = CLIENT_ACTION_RECEIVED_EVENT;
    constructor(
        private readonly _logger: ILogger = createLogger(
            "TrackClientActionsPerSecondHandler"
        ),
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {}
    public handle({  }: ClientActionReceivedEventData): void {
        incrementClientAction();
    }
}
