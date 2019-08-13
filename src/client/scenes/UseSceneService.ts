import { ICommandHandlerRegister } from "../../engine/command/api/ICommandHandlerRegister";
import { Inject } from "../../engine/ioc/Create";
import { CreateGameSceneOrchestratorCommandHandler } from "./create/CreateGameSceneOrchestratorCommandHandler";

export const useSceneService = (
    commandHandlerRegister: ICommandHandlerRegister = Inject(
        ICommandHandlerRegister
    )
) => {
    commandHandlerRegister.register(CreateGameSceneOrchestratorCommandHandler);
};
