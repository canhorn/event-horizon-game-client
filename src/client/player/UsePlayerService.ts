import { ICommandHandlerRegister } from "../../engine/command/api/ICommandHandlerRegister";
import { IEventHandlerRegister } from "../../engine/event/IEventService";
import { Inject } from "../../engine/ioc/Create";
import { IQueryHandlerRegister } from "../../engine/query/IQueryService";
import { PlayerActionEventHandler } from "./action/PlayerActionEventHandler";
import { GetClientPlayerHandler } from "./query/getClientPlayer/GetClientPlayerHandler";
import { RegisterPlayerCommandHandler } from "./register/RegisterPlayerCommandHandler";

export const usePlayerService = (
    eventHandlerRegister: IEventHandlerRegister = Inject(IEventHandlerRegister),
    queryHandlerRegister: IQueryHandlerRegister = Inject(IQueryHandlerRegister),
    commandHandlerRegister: ICommandHandlerRegister = Inject(
        ICommandHandlerRegister
    )
) => {
    eventHandlerRegister.register(PlayerActionEventHandler);

    queryHandlerRegister.register(GetClientPlayerHandler);

    commandHandlerRegister.register(RegisterPlayerCommandHandler);
};
