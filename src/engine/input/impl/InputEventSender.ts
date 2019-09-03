import { KeyEvent } from "keyboardjs";
import { autobind } from "../../../core/autobind/autobind";
import { EventType, IEvent, IEventService } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { throttleMethod } from "../../../core/throttle/ThrottleDecorator";
import {
    IInputPressedEventSender,
    IInputReleasedEventSender,
} from "../IInputEventSender";

export const INPUT_KEY_PRESS_EVENT = new EventType(
    "input.INPUT_KEY_PRESS_EVENT"
);
export const INPUT_KEY_RELEASED_EVENT = new EventType(
    "input.INPUT_KEY_RELEASED_EVENT"
);

export interface IEventData {
    key: string;
}

const inputPressedEvent: IEvent = {
    type: INPUT_KEY_PRESS_EVENT,
};

export const createInputPressedEvent = (eventData: IEventData) => {
    inputPressedEvent.data = eventData;
    return inputPressedEvent;
};

const inputReleasedEvent: IEvent = {
    type: INPUT_KEY_RELEASED_EVENT,
};

export const createInputReleasedEvent = (eventData: IEventData) => {
    inputReleasedEvent.data = eventData;
    return inputReleasedEvent;
};

export class InputPressedEventSender implements IInputPressedEventSender {
    constructor(
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {}

    @autobind
    @throttleMethod(100)
    public sendEvent(keyEvent: KeyEvent): void {
        this._eventService.publish(
            createInputPressedEvent({ key: keyEvent.key })
        );
    }
}
export class InputReleasedEventSender implements IInputReleasedEventSender {
    constructor(
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {}

    @autobind
    @throttleMethod(100)
    public sendEvent(keyEvent: KeyEvent): void {
        this._eventService.publish(
            createInputReleasedEvent({ key: keyEvent.key })
        );
    }
}
