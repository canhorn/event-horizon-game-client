import { IEventHandler, IEventService, IEventType } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import {
    ACCOUNT_CONNECTED_EVENT,
    AccountConnectedEventData,
} from "../../server/core/account/connected/AccountConnectedEvent";
import { IAccountConnectedInfo } from "../../server/core/api/IAccountConnectedInfo";
import { IZoneDetails } from "../api/IZoneDetails";
import { createZoneChangedEvent } from "../changed/ZoneChangedEvent";
import { setZoneDetails } from "../state/ZoneState";

/**
 * Name: AccountConnectedUpdateZoneEventHandler
 * Type: Event
 */
export class AccountConnectedUpdateZoneEventHandler implements IEventHandler {
    public type: IEventType = ACCOUNT_CONNECTED_EVENT;
    constructor(
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {}
    public handle({
        accountInfo,
    }: AccountConnectedEventData<IClientAccountInfo>): void {
        setZoneDetails(accountInfo.zone);
        this._eventService.publish(createZoneChangedEvent({}));
    }
}

interface IClientAccountInfo extends IAccountConnectedInfo {
    zone: IZoneDetails;
}
