import { IEventHandlerRegister } from "../event/IEventService";
import { Inject } from "../ioc/Create";
import { AddParticleTemplateHandler } from "./add/AddParticleTemplateHandler";
import { CreateParticleFromTemplateHandler } from "./create/CreateParticleFromTemplateHandler";
import { DisposeParticleModuleHandler } from "./dispose/DisposeParticleModuleHandler";
import { StartParticleModuleHandler } from "./start/StartParticleModuleHandler";
import { StopParticleModuleHandler } from "./stop/StopParticleModuleHandler";
import { UpdateParticleModuleHandler } from "./update/UpdateParticleModuleHandler";

export const preInitializeParticle = (
    eventHandlerRegister: IEventHandlerRegister = Inject(IEventHandlerRegister)
) => {
    eventHandlerRegister.register(AddParticleTemplateHandler);
    eventHandlerRegister.register(CreateParticleFromTemplateHandler);
    eventHandlerRegister.register(StartParticleModuleHandler);
    eventHandlerRegister.register(StopParticleModuleHandler);
    eventHandlerRegister.register(DisposeParticleModuleHandler);
    eventHandlerRegister.register(UpdateParticleModuleHandler);
};
