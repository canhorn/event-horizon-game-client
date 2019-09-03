import { ICommandService } from "../../../core/command";
import { IEventHandler, IEventType } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { createInvokeMethodOnZoneConnectionCommand } from "../../server/zone/invoke/InvokeMethodOnZoneConnectionCommand";
import { PlayerActionEventData, PLAYER_ACTION_EVENT } from "./PlayerActionEvent";

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
