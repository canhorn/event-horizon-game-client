import { ICommandHandlerRegister } from "../../core/command";
import { Inject } from "../../core/ioc";
import { RegisterInputCommandHandler } from "./register/RegisterInputCommandHandler";

export const preInitializeInput = (
    commandHandlerRegister: ICommandHandlerRegister = Inject(
        ICommandHandlerRegister
    )
) => {
    commandHandlerRegister.register(RegisterInputCommandHandler);
};
