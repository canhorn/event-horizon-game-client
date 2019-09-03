import { ICommandHandlerRegister } from "../../../core/command";
import { Inject } from "../../../core/ioc";
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
