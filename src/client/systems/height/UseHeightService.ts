import { ICommandHandlerRegister } from "../../../core/command";
import { createSingletonService, Inject } from "../../../core/ioc";
import { IHeightResolver, ISetHeightResolver } from "./api/IHeightResolver";
import { HeightResolver } from "./model/HeightResolver";
import { SetHeightResolverCoordinatesCommandHandler } from "./set/SetHeightResolverCoordinatesCommandHandler";

export const useHeightService = (
    commandHandlerRegister: ICommandHandlerRegister = Inject(
        ICommandHandlerRegister
    )
) => {
    createSingletonService(ISetHeightResolver, HeightResolver);
    createSingletonService(IHeightResolver, HeightResolver);
    commandHandlerRegister.register(SetHeightResolverCoordinatesCommandHandler);
};
