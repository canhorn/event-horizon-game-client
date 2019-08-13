import { IEventHandlerRegister } from "../../engine/event/IEventService";
import { Inject } from "../../engine/ioc/Create";
import { IQueryHandlerRegister } from "../../engine/query/IQueryService";
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
