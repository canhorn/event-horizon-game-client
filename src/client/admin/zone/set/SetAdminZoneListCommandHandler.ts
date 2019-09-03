import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../../core/command";
import { IEventService } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { createAdminChangedEvent } from "../../changed/AdminChangedEvent";
import { setZoneServerList } from "../../state/AdminState";
import {
    SET_ADMIN_ZONE_LIST_COMMAND,
    SetAdminZoneListCommandData,
    SetAdminZoneListCommandResultType,
} from "./SetAdminZoneListCommand";

/**
 * Name: SetAdminZoneListCommand
 * Type: Command
 */
export class SetAdminZoneListCommandHandler implements ICommandHandler {
    public type: ICommandType = SET_ADMIN_ZONE_LIST_COMMAND;
    constructor(
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {}
    public handle({
        zoneList,
    }: SetAdminZoneListCommandData): ICommandResult<
        SetAdminZoneListCommandResultType
    > {
        setZoneServerList(zoneList);
        this._eventService.publish(createAdminChangedEvent({}));
        return {
            success: true,
        };
    }
}
