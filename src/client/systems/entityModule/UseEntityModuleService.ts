import { ICommandHandlerRegister } from "../../../engine/command/api/ICommandHandlerRegister";
import { IEventHandlerRegister } from "../../../engine/event/IEventService";
import { Inject } from "../../../engine/ioc/Create";
import { RegisterAllBaseModulesCommandHandler } from "./register/RegisterAllBaseModulesCommandHandler";
import { RegisterAllPlayerModulesCommandHandler } from "./register/RegisterAllPlayerModulesCommandHandler";

export const useEntityModuleService = (
    commandHandlerRegister: ICommandHandlerRegister = Inject(
        ICommandHandlerRegister
    )
) => {
    commandHandlerRegister.register(RegisterAllBaseModulesCommandHandler);
    commandHandlerRegister.register(RegisterAllPlayerModulesCommandHandler);
};
