import { ICommandHandler } from "../../../../command/api/ICommandHandler";
import { ICommandResult } from "../../../../command/api/ICommandResult";
import { ICommandType } from "../../../../command/api/ICommandType";
import { IEventService } from "../../../../event/IEventService";
import { Inject } from "../../../../ioc/Create";
import { createClientEntityInstanceRegisteredEvent } from "../register/ClientEntityInstanceRegisteredEvent";
import { createRegisteringClientEntityInstanceEvent } from "../register/RegisteringClientEntityInstanceEvent";
import { setClientEntityInstance } from "../store/ClientEntityInstanceStore";
import {
    SET_CLIENT_ENTITY_INSTANCE_COMMAND,
    SetClientEntityInstanceCommandData,
} from "./SetClientEntityInstanceCommand";

/**
 * Name: SetClientEntityInstanceCommand
 * Type: Command
 */
export class SetClientEntityInstanceCommandHandler implements ICommandHandler {
    public type: ICommandType = SET_CLIENT_ENTITY_INSTANCE_COMMAND;
    constructor(
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {}
    public handle({
        clientEntityInstance,
    }: SetClientEntityInstanceCommandData): ICommandResult {
        this._eventService.publish(
            createRegisteringClientEntityInstanceEvent({
                clientEntityInstance,
            })
        );
        setClientEntityInstance(clientEntityInstance);
        this._eventService.publish(
            createClientEntityInstanceRegisteredEvent({ clientEntityInstance })
        );
        return {
            success: true,
        };
    }
}
