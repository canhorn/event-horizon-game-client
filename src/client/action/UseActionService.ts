import { IEventHandlerRegister } from "../../engine/event/IEventService";
import { Inject } from "../../engine/ioc/Create";
import { ClientActionReceivedEventHandler } from "./received/ClientActionReceivedEventHandler";

export const useActionService = (
    eventHandlerRegister: IEventHandlerRegister = Inject(IEventHandlerRegister)
) => {
    eventHandlerRegister.register(ClientActionReceivedEventHandler);
};
