import { IEventHandlerRegister } from "../../core/event";
import { Inject } from "../../core/ioc";
import { GameLoadedHandler } from "./loaded/GameLoadedHandler";
import { ShowLoadingUiEventHandler } from "./show/ShowLoadingUiEventHandler";

export const preInitializeLoading = (
    eventHandlerRegister: IEventHandlerRegister = Inject(IEventHandlerRegister)
) => {
    eventHandlerRegister.register(GameLoadedHandler);
    eventHandlerRegister.register(ShowLoadingUiEventHandler);
};
