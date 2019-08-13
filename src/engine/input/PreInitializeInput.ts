import { ICommandHandlerRegister } from "../command/api/ICommandHandlerRegister";
import { Inject } from "../ioc/Create";
import { RegisterInputCommandHandler } from "./register/RegisterInputCommandHandler";

export const preInitializeInput = (
    commandHandlerRegister: ICommandHandlerRegister = Inject(
        ICommandHandlerRegister
    )
) => {
    commandHandlerRegister.register(RegisterInputCommandHandler);
};
