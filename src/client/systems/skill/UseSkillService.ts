import { ICommandHandlerRegister } from "../../../core/command";
import { IEventHandlerRegister } from "../../../core/event";
import { Inject } from "../../../core/ioc";
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
