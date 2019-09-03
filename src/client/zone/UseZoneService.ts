import { IEventHandlerRegister } from "../../core/event";
import { Inject } from "../../core/ioc";
import { IQueryHandlerRegister } from "../../core/query";
import { AccountConnectedUpdateZoneEventHandler } from "./connected/AccountConnectedUpdateZoneEventHandler";
import { ZonePlayerInfoReceivedEventHandler } from "./playerInfoReceived/ZonePlayerInfoReceivedEventHandler";
import { ZoneDetailsQueryHandler } from "./query/ZoneDetailsQueryHandler";

export const useZoneService = (
    eventHandlerRegister: IEventHandlerRegister = Inject(IEventHandlerRegister),
    queryHandlerRegister: IQueryHandlerRegister = Inject(IQueryHandlerRegister)
) => {
    eventHandlerRegister.register(AccountConnectedUpdateZoneEventHandler);
    eventHandlerRegister.register(ZonePlayerInfoReceivedEventHandler);
    queryHandlerRegister.register(ZoneDetailsQueryHandler);
};
