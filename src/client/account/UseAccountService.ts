import { ICommandHandlerRegister } from "../../core/command";
import { IEventHandlerRegister } from "../../core/event";
import { Inject } from "../../core/ioc";
import { IQueryHandlerRegister } from "../../core/query";
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
