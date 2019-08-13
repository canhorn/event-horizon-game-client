import { GameSettingsBasedCanvas } from "../canvas/GameSettingsBasedCanvas";
import { ICanvas } from "../canvas/ICanvas";
import { ICommandHandlerRegister } from "../command/api/ICommandHandlerRegister";
import { ICommandService } from "../command/api/ICommandService";
import { CommandHandlerRegister } from "../command/model/CommandHandlerRegister";
import { CommandService } from "../command/model/CommandService";
import { EventHandlerRegister } from "../event/EventHandlerRegister";
import { EventServiceImpl } from "../event/EventServiceImpl";
import { IEventHandlerRegister, IEventService } from "../event/IEventService";
import { MainRenderingGui } from "../gui/rendering/MainRenderingGui";
import {
    createSingletonProviderService,
    createSingletonService,
} from "../ioc/Create";
import { RegisterBeforeRenderable } from "../lifecycle/register/impl/RegisterBeforeRenderable";
import { RegisterDisposable } from "../lifecycle/register/impl/RegisterDisposable";
import { RegisterDrawable } from "../lifecycle/register/impl/RegisterDrawable";
import { RegisterInitializable } from "../lifecycle/register/impl/RegisterInitializable";
import { RegisterUpdatable } from "../lifecycle/register/impl/RegisterUpdatable";
import { IRegisterBeforeRenderable } from "../lifecycle/register/IRegisterBeforeRenderable";
import { IRegisterDisposable } from "../lifecycle/register/IRegisterDisposable";
import { IRegisterDrawable } from "../lifecycle/register/IRegisterDrawable";
import { IRegisterInitializable } from "../lifecycle/register/IRegisterInitializable";
import { IRegisterUpdatable } from "../lifecycle/register/IRegisterUpdatable";
import { ILoggerFactory, LoggerFactory } from "../logger/LoggerFactory";
import { IGuid } from "../math/guid/IGuid";
import { GuidImpl } from "../math/guid/impl/GuidImpl";
import { IIndexPool } from "../math/index/IIndexPool";
import { IndexPool } from "../math/index/impl/IndexPool";
import { IQueryHandlerRegister, IQueryService } from "../query/IQueryService";
import { QueryHandlerRegister } from "../query/QueryHandlerRegister";
import { QueryService } from "../query/QueryService";
import { IBeforeRendering } from "../renderer/api/IBeforeRendering";
import { IEngineRenderingAPI } from "../renderer/api/IEngineRenderingAPI";
import { IRenderingEngine } from "../renderer/api/IRenderingEngine";
import { IRenderingGui } from "../renderer/api/IRenderingGui";
import { IRenderingScene } from "../renderer/api/IRenderingScene";
import { IRenderingTime } from "../renderer/api/IRenderingTime";
import { BeforeRendering } from "../renderer/BeforeRendering";
import { EngineRenderingAPI } from "../renderer/model/EngineRenderingAPI";
import { RenderingEngineImpl } from "../renderer/RenderingEngineImpl";
import { RenderingSceneImpl } from "../renderer/RenderingSceneImpl";
import { RenderingTime } from "../renderer/RenderingTime";
import { DelayService } from "../timer/DelayService";
import { IDelayService } from "../timer/IDelayService";
import { ISystemWindow } from "./window/api/ISystemWindow";
import { SystemWindow } from "./window/model/SystemWindow";

export const setupGlobalSystemServices = () => {
    createSingletonProviderService(ISystemWindow, {
        get: () => new SystemWindow(window),
    });

    createSingletonService(ILoggerFactory, LoggerFactory);
    createSingletonService(IIndexPool, IndexPool);
    createSingletonService(IGuid, GuidImpl);
    createSingletonService(IEventService, EventServiceImpl);
    createSingletonService(ICommandService, CommandService);
    createSingletonService(IQueryService, QueryService);
    createSingletonService(IDelayService, DelayService);

    // Core services
    createSingletonService(ICanvas, GameSettingsBasedCanvas);
    createSingletonService(IRenderingEngine, RenderingEngineImpl);
    createSingletonService(IEngineRenderingAPI, EngineRenderingAPI);
    createSingletonService(IRenderingScene, RenderingSceneImpl);
    createSingletonService(IRenderingGui, MainRenderingGui);
    createSingletonService(IBeforeRendering, BeforeRendering);
    createSingletonService(IRenderingTime, RenderingTime);
    createSingletonService(IEventHandlerRegister, EventHandlerRegister);
    createSingletonService(ICommandHandlerRegister, CommandHandlerRegister);
    createSingletonService(IQueryHandlerRegister, QueryHandlerRegister);

    // Life-cycle services
    createSingletonService(IRegisterBeforeRenderable, RegisterBeforeRenderable);
    createSingletonService(IRegisterDisposable, RegisterDisposable);
    createSingletonService(IRegisterDrawable, RegisterDrawable);
    createSingletonService(IRegisterInitializable, RegisterInitializable);
    createSingletonService(IRegisterUpdatable, RegisterUpdatable);
};
