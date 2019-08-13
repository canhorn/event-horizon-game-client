import { ICommandService } from "../../../engine/command/api/ICommandService";
import { IEventType } from "../../../engine/event/EventType";
import { IEventHandler } from "../../../engine/event/IEventService";
import { Inject } from "../../../engine/ioc/Create";
import { createInvokeMethodOnZoneConnectionCommand } from "../../server/zone/invoke/InvokeMethodOnZoneConnectionCommand";
import {
    PLAYER_ACTION_EVENT,
    PlayerActionEventData,
} from "./PlayerActionEvent";

/**
 * Event Name: PlayerActionEvent
 * Type: Event
 */
export class PlayerActionEventHandler implements IEventHandler {
    public type: IEventType = PLAYER_ACTION_EVENT;
    constructor(
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}
    public handle({ action, data }: PlayerActionEventData): void {
        this._commandService.send(
            createInvokeMethodOnZoneConnectionCommand({
                method: "PlayerAction",
                args: [action, data],
            })
        );
    }
}
