import { ICommandHandlerRegister } from "../../core/command";
import { Inject } from "../../core/ioc";
import { IQueryHandlerRegister } from "../../core/query";
import { ActivateGuiCommandHandler } from "./activate/ActivateGuiCommandHandler";
import { AddGuiToParentControlCommandHandler } from "./add/AddGuiToParentControlCommandHandler";
import { CreateGuiCommandHandler } from "./create/CreateGuiCommandHandler";
import { DisposeOfGuiCommandHandler } from "./dispose/DisposeOfGuiCommandHandler";
import { DisposeOfGuiControlChildrenCommandHandler } from "./dispose/DisposeOfGuiControlChildrenCommandHandler";
import { DisposeOfGuiControlCommandHandler } from "./dispose/DisposeOfGuiControlCommandHandler";
import { HideGuiCommandHandler } from "./hide/HideGuiCommandHandler";
import { LinkGuiWithCommandHandler } from "./link/LinkGuiWithCommandHandler";
import { QueryForGenerateGuiControlIdHandler } from "./query/QueryForGenerateGuiControlIdHandler";
import { RegisterGuiControlCommandHandler } from "./register/RegisterGuiControlCommandHandler";
import { RegisterGuiLayoutDataCommandHandler } from "./register/RegisterGuiLayoutDataCommandHandler";
import { SetupGuiLayoutCommandHandler } from "./setup/SetupGuiLayoutCommandHandler";
import { ShowGuiCommandHandler } from "./show/ShowGuiCommandHandler";
import { initializePlatformGuiState } from "./store/InitializePlatformGuiState";
import { UpdateGuiControlCommandHandler } from "./update/UpdateGuiControlCommandHandler";

export const preInitializeGui = (
    queryHandlerRegister: IQueryHandlerRegister = Inject(IQueryHandlerRegister),
    commandHandlerRegister: ICommandHandlerRegister = Inject(
        ICommandHandlerRegister
    )
) => {
    queryHandlerRegister.register(QueryForGenerateGuiControlIdHandler);

    commandHandlerRegister.register(ActivateGuiCommandHandler);
    commandHandlerRegister.register(AddGuiToParentControlCommandHandler);
    commandHandlerRegister.register(CreateGuiCommandHandler);
    commandHandlerRegister.register(DisposeOfGuiCommandHandler);
    commandHandlerRegister.register(DisposeOfGuiControlChildrenCommandHandler);
    commandHandlerRegister.register(DisposeOfGuiControlCommandHandler);
    commandHandlerRegister.register(HideGuiCommandHandler);
    commandHandlerRegister.register(LinkGuiWithCommandHandler);
    commandHandlerRegister.register(RegisterGuiControlCommandHandler);
    commandHandlerRegister.register(RegisterGuiLayoutDataCommandHandler);
    commandHandlerRegister.register(SetupGuiLayoutCommandHandler);
    commandHandlerRegister.register(ShowGuiCommandHandler);
    commandHandlerRegister.register(UpdateGuiControlCommandHandler);

    initializePlatformGuiState();
};
