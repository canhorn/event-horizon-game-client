import { ICommandHandlerRegister } from "../command/api/ICommandHandlerRegister";
import { Inject } from "../ioc/Create";
import { ActivateLayoutHandler } from "./activate/ActivateLayoutHandler";
import { AddLayoutHandler } from "./add/AddLayoutHandler";
import { AddLayoutToControlCommandHandler } from "./add/AddLayoutToControlCommandHandler";
import { AddTemplateHandler } from "./add/AddTemplateHandler";
import { CreateGuiCommandHandler } from "./create/CreateGuiCommandHandler";
import { DisposeOfGuiControlHandler } from "./dispose/DisposeOfGuiControlHandler";
import { DisposeOfGuiLayoutCommandHandler } from "./dispose/DisposeOfGuiLayoutCommandHandler";
import { HideLayoutCommandHandler } from "./hide/HideLayoutCommandHandler";
import { LinkGuiControlWithMeshHandler } from "./link/LinkGuiControlWithMeshHandler";
import { RegisterControlHandler } from "./register/RegisterControlHandler";
import { ShowLayoutCommandHandler } from "./show/ShowLayoutCommandHandler";
import { UpdateGuiControlHandler } from "./update/UpdateGuiControlHandler";

export const preInitializeGui = (
    commandHandlerRegister: ICommandHandlerRegister = Inject(
        ICommandHandlerRegister
    )
) => {
    commandHandlerRegister.register(ActivateLayoutHandler);
    commandHandlerRegister.register(AddLayoutHandler);
    commandHandlerRegister.register(AddTemplateHandler);
    commandHandlerRegister.register(DisposeOfGuiControlHandler);
    commandHandlerRegister.register(DisposeOfGuiLayoutCommandHandler);
    commandHandlerRegister.register(LinkGuiControlWithMeshHandler);
    commandHandlerRegister.register(RegisterControlHandler);
    commandHandlerRegister.register(UpdateGuiControlHandler);
    commandHandlerRegister.register(AddLayoutToControlCommandHandler);
    commandHandlerRegister.register(CreateGuiCommandHandler);
    commandHandlerRegister.register(ShowLayoutCommandHandler);
    commandHandlerRegister.register(HideLayoutCommandHandler);
};
