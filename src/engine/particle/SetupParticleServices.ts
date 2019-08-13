import { createSingletonServiceFactory } from "../ioc/Create";
import { TemplateParticleService } from "./impl/TemplateParticleService";
import {
    IParticleLifecycleService,
    IParticleService,
} from "./IParticleService";

let particleService: TemplateParticleService | undefined;
const getParticleService = () => {
    particleService = particleService || new TemplateParticleService();
    return particleService;
};

export const setupParticleServices = () => {
    createSingletonServiceFactory(IParticleService, getParticleService);
    createSingletonServiceFactory(
        IParticleLifecycleService,
        getParticleService
    );
};
