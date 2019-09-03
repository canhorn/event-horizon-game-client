import { ICommandService } from "../../../../core/command";
import { IEventHandler, IEventType } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { createLogger, ILogger } from "../../../../core/logger";
import { getCoreAdminConnectionGetAllZones } from "../../core/state/CoreAdminConnectionState";
import { createSetAdminZoneListCommand } from "../set/SetAdminZoneListCommand";
import {
    FETCH_ADMIN_ZONE_LIST_EVENT,
    FetchAdminZoneListEventData,
} from "./FetchAdminZoneListEvent";

/**
 * Event Name: FetchAdminZoneListEvent
 * Type: Event
 */
export class FetchAdminZoneListEventHandler implements IEventHandler {
    public type: IEventType = FETCH_ADMIN_ZONE_LIST_EVENT;
    constructor(
        private readonly _logger: ILogger = createLogger(
            "FetchAdminZoneListEventHandler"
        ),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}
    public handle({  }: FetchAdminZoneListEventData): void {
        getCoreAdminConnectionGetAllZones()
            .then(zoneList => {
                this._commandService.send(
                    createSetAdminZoneListCommand({
                        zoneList,
                    })
                );
            })
            .catch(reason => {
                this._logger.error(
                    "Failed to get zone list from server.",
                    reason
                );
            });
    }
}
