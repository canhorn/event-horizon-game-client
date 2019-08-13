import { Inject } from "../../ioc/Create";
import { IEventService } from "../IEventService";

export const sendEvent = (
    eventName: string,
    data: any,
    eventService: IEventService = Inject(IEventService)
): void =>
    eventService.publish({
        type: {
            key: eventName,
        },
        data,
    });
