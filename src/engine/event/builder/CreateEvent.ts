import { IEvent } from "../EventType";

export const createEvent = (event: string, data?: any): IEvent => ({
    type: {
        key: event,
    },
    data,
});
