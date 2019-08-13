import { ICommandService } from "../../../engine/command/api/ICommandService";
import { IEventType } from "../../../engine/event/EventType";
import { IEventHandler } from "../../../engine/event/IEventService";
import { Inject } from "../../../engine/ioc/Create";
import {
    CLIENT_ACTION_ENTITY_REGISTERED_EVENT,
    ClientActionRegisterEntityData,
} from "../../action/api/ClientActions";
import { createRegisterEntityCommand } from "./RegisterEntityCommand";

/**
 * Event Name: ClientActionEntityRegisterEvent
 * Type: Event
 */
export class ClientActionEntityRegisterEventHandler implements IEventHandler {
    public type: IEventType = CLIENT_ACTION_ENTITY_REGISTERED_EVENT;
    constructor(
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}
    public handle({ entity }: ClientActionRegisterEntityData): void {
        this._commandService.send(
            createRegisterEntityCommand({ entityDetails: entity })
        );
    }
}
