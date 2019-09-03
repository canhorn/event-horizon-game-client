import { ICommandHandlerRegister } from "../../core/command";
import { Inject } from "../../core/ioc";
import { CreateGameSceneOrchestratorCommandHandler } from "./create/CreateGameSceneOrchestratorCommandHandler";

export const useSceneService = (
    commandHandlerRegister: ICommandHandlerRegister = Inject(
        ICommandHandlerRegister
    )
) => {
    commandHandlerRegister.register(CreateGameSceneOrchestratorCommandHandler);
};
