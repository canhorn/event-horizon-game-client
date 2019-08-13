import { Inject } from "../ioc/Create";
import {
    IEventHandler,
    IEventHandlerRegister,
    IEventService,
} from "./IEventService";

export class EventHandlerRegister implements IEventHandlerRegister {
    private static HANDLERS: IEventHandler[] = [];

    constructor(
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {}

    public register(handler: new () => IEventHandler): void {
        const eventHandler = new handler();
        this._eventService.addEventListener(
            eventHandler.type,
            eventHandler.handle,
            eventHandler
        );
        EventHandlerRegister.HANDLERS.push(eventHandler);
    }
    public dispose(): void {
        EventHandlerRegister.HANDLERS.forEach(handler => {
            this._eventService.removeEventListener(
                handler.type,
                handler.handle,
                handler
            );
        });
        EventHandlerRegister.HANDLERS = [];
    }
}
