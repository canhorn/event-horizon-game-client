import { IEventHandlerRegister } from "../../core/event";
import { Inject } from "../../core/ioc";
import { ClientActionReceivedEventHandler } from "./received/ClientActionReceivedEventHandler";

export const useActionService = (
    eventHandlerRegister: IEventHandlerRegister = Inject(IEventHandlerRegister)
) => {
    eventHandlerRegister.register(ClientActionReceivedEventHandler);
};
