import { ICommandHandlerRegister } from "../../core/command";
import { IEventHandlerRegister } from "../../core/event";
import { Inject } from "../../core/ioc";
import { IQueryHandlerRegister } from "../../core/query";
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
