import { ICommandHandler } from "../../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { IEventService } from "../../../../engine/event/IEventService";
import { Inject } from "../../../../engine/ioc/Create";
import { createAdminChangedEvent } from "../../changed/AdminChangedEvent";
import { setZoneServerList } from "../../state/AdminState";
import {
    SET_ADMIN_ZONE_LIST_COMMAND,
    SetAdminZoneListCommandData,
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
    public handle({ zoneList }: SetAdminZoneListCommandData): ICommandResult {
        setZoneServerList(zoneList);
        this._eventService.publish(createAdminChangedEvent({}));
        return {
            success: true,
        };
    }
}
