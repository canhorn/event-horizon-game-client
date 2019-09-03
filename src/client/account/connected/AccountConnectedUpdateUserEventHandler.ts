import { IEventHandler, IEventService, IEventType } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { IPlayerAccountDetails } from "../../player/api/IPlayerAccountDetails";
import {
    ACCOUNT_CONNECTED_EVENT,
    AccountConnectedEventData,
} from "../../server/core/account/connected/AccountConnectedEvent";
import { IAccountConnectedInfo } from "../../server/core/api/IAccountConnectedInfo";
import { createAccountChangedEvent } from "../changed/AccountChangedEvent";
import { setAccountUser } from "../state/AccountState";

/**
 * Name: AccountConnectedEvent
 * Type: Event
 */
export class AccountConnectedUpdateUserEventHandler implements IEventHandler {
    public type: IEventType = ACCOUNT_CONNECTED_EVENT;
    constructor(
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {}
    public handle({
        accountInfo,
    }: AccountConnectedEventData<IClientAccountInfo>): void {
        const { username, locale } = accountInfo.player;
        setAccountUser({
            username,
            locale,
        });
        this._eventService.publish(createAccountChangedEvent({}));
    }
}

interface IClientAccountInfo extends IAccountConnectedInfo {
    player: IPlayerAccountDetails;
}
