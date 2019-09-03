import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../../../core/command";
import { IEventService } from "../../../../../core/event";
import { Inject } from "../../../../../core/ioc";
import { createClientEntityInstanceRegisteredEvent } from "../register/ClientEntityInstanceRegisteredEvent";
import { createRegisteringClientEntityInstanceEvent } from "../register/RegisteringClientEntityInstanceEvent";
import { setClientEntityInstance } from "../store/ClientEntityInstanceStore";
import {
    SET_CLIENT_ENTITY_INSTANCE_COMMAND,
    SetClientEntityInstanceCommandData,
    SetClientEntityInstanceCommandResultType,
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
    }: SetClientEntityInstanceCommandData): ICommandResult<
        SetClientEntityInstanceCommandResultType
    > {
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
