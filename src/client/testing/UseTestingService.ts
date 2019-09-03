import { IEventHandlerRegister } from "../../core/event";
import { Inject } from "../../core/ioc";
import { TrackClientActionsPerSecondHandler } from "./debugging/clientActions/TrackClientActionsPerSecond";
import { EditorSetupAfterZoneLoadedEventHandler } from "./editor/loaded/EditorSetupAfterZoneLoadedEventHandler";
import { ZoneLoadedEventHandler } from "./loaded/ZoneLoadedEventHandler";

export const useTestingService = (
    eventHandlerRegister: IEventHandlerRegister = Inject(IEventHandlerRegister)
) => {
    eventHandlerRegister.register(ZoneLoadedEventHandler);
    eventHandlerRegister.register(EditorSetupAfterZoneLoadedEventHandler);
    eventHandlerRegister.register(TrackClientActionsPerSecondHandler);
};
