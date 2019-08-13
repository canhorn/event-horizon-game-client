import { ICommandHandlerRegister } from "../../../engine/command/api/ICommandHandlerRegister";
import { IEventHandlerRegister } from "../../../engine/event/IEventService";
import { Inject } from "../../../engine/ioc/Create";
import { ClientRunSkillActionEventHandler } from "./run/ClientRunSkillActionEventHandle";
import { setupSkillScriptServices } from "./setup/SetupSkillScriptServices";

export const useSkillService = (
    eventHandlerRegister: IEventHandlerRegister = Inject(IEventHandlerRegister),
    commandHandlerRegister: ICommandHandlerRegister = Inject(
        ICommandHandlerRegister
    )
) => {
    setupSkillScriptServices();

    eventHandlerRegister.register(ClientRunSkillActionEventHandler);
};
