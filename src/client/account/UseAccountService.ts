import { ICommandHandlerRegister } from "../../engine/command/api/ICommandHandlerRegister";
import { IEventHandlerRegister } from "../../engine/event/IEventService";
import { Inject } from "../../engine/ioc/Create";
import { IQueryHandlerRegister } from "../../engine/query/IQueryService";
import { AccountConnectedUpdateUserEventHandler } from "./connected/AccountConnectedUpdateUserEventHandler";
import { GetAccountQueryHandler } from "./get/GetAccountQueryHandler";
import { SetupAccountCommandHandler } from "./setup/SetupAccountCommandHandler";

export const useAccountService = (
    queryHandlerRegister: IQueryHandlerRegister = Inject(IQueryHandlerRegister),
    commandHandlerRegister: ICommandHandlerRegister = Inject(
        ICommandHandlerRegister
    ),
    eventHandlerRegister: IEventHandlerRegister = Inject(IEventHandlerRegister)
) => {
    queryHandlerRegister.register(GetAccountQueryHandler);
    commandHandlerRegister.register(SetupAccountCommandHandler);
    eventHandlerRegister.register(AccountConnectedUpdateUserEventHandler);
};
