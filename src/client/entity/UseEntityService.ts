import { ICommandHandlerRegister } from "../../engine/command/api/ICommandHandlerRegister";
import { IEventHandlerRegister } from "../../engine/event/IEventService";
import { createSingletonService, Inject } from "../../engine/ioc/Create";
import { IQueryHandlerRegister } from "../../engine/query/IQueryService";
import { ClientEntityInstanceRegisteredEventHandler } from "./instanced/registered/ClientEntityInstanceRegisteredEventHandler";
import { CreateLightFromSettingsCommandHandler } from "./light/create/CreateLightFromSettingsCommandHandler";
import { CreateMapFromMeshSettingsCommandHandler } from "./map/create/CreateMapFromMeshSettingsCommandHandler";
import { ClientActionEntityRegisterEventHandler } from "./register/ClientActionEntityRegisterEventHandler";
import { RegisterEntityCommandHandler } from "./register/RegisterEntityCommandHandler";
import { DisposeOfTrackedEntitiesCommandHandler } from "./tracked/dispose/DisposeOfTrackedEntitiesCommandHandler";
import { EntityTrackerService } from "./tracked/EntityTrackerServices";
import {
    IEntityTrackerDisposableService,
    IEntityTrackerQueryService,
    IEntityTrackerService,
} from "./tracked/IEntityTrackerServices";
import { QueryForEntityHandler } from "./tracked/query/QueryForEntityHandler";
import { TrackEntityEventHandler } from "./tracked/track/TrackEntityEventHandler";
import { UnTrackEntityEventHandler } from "./tracked/unTrack/UnTrackEntityEventHandler";
import { ClientActionEntityUnregisterEventHandler } from "./unregister/ClientActionEntityUnregisterEventHandler";

export const useEntityService = (
    eventHandlerRegister: IEventHandlerRegister = Inject(IEventHandlerRegister),
    queryHandlerRegister: IQueryHandlerRegister = Inject(IQueryHandlerRegister),
    commandHandlerRegister: ICommandHandlerRegister = Inject(
        ICommandHandlerRegister
    )
) => {
    createSingletonService(IEntityTrackerService, EntityTrackerService);
    createSingletonService(IEntityTrackerQueryService, EntityTrackerService);
    createSingletonService(
        IEntityTrackerDisposableService,
        EntityTrackerService
    );
    eventHandlerRegister.register(TrackEntityEventHandler);
    eventHandlerRegister.register(UnTrackEntityEventHandler);
    eventHandlerRegister.register(ClientActionEntityRegisterEventHandler);
    eventHandlerRegister.register(ClientActionEntityUnregisterEventHandler);
    eventHandlerRegister.register(ClientEntityInstanceRegisteredEventHandler);

    queryHandlerRegister.register(QueryForEntityHandler);

    commandHandlerRegister.register(DisposeOfTrackedEntitiesCommandHandler);
    commandHandlerRegister.register(CreateLightFromSettingsCommandHandler);
    commandHandlerRegister.register(CreateMapFromMeshSettingsCommandHandler);
    commandHandlerRegister.register(RegisterEntityCommandHandler);
};
