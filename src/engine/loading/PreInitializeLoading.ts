import { IEventHandlerRegister } from "../event/IEventService";
import { Inject } from "../ioc/Create";
import { GameLoadedHandler } from "./loaded/GameLoadedHandler";
import { ShowLoadingUiEventHandler } from "./show/ShowLoadingUiEventHandler";

export const preInitializeLoading = (
    eventHandlerRegister: IEventHandlerRegister = Inject(IEventHandlerRegister)
) => {
    eventHandlerRegister.register(GameLoadedHandler);
    eventHandlerRegister.register(ShowLoadingUiEventHandler);
};
