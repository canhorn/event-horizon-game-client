import { createSingletonService } from "../../core/ioc";
import { GameSettingsBasedCanvas } from "../canvas/GameSettingsBasedCanvas";
import { ICanvas } from "../canvas/ICanvas";
import { MainRenderingGui } from "../gui/rendering/MainRenderingGui";
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

export const setupGlobalSystemServices = () => {
    // Core services
    createSingletonService(ICanvas, GameSettingsBasedCanvas);
    createSingletonService(IRenderingEngine, RenderingEngineImpl);
    createSingletonService(IEngineRenderingAPI, EngineRenderingAPI);
    createSingletonService(IRenderingScene, RenderingSceneImpl);
    createSingletonService(IRenderingGui, MainRenderingGui);
    createSingletonService(IBeforeRendering, BeforeRendering);
    createSingletonService(IRenderingTime, RenderingTime);

    // Life-cycle services
    createSingletonService(IRegisterBeforeRenderable, RegisterBeforeRenderable);
    createSingletonService(IRegisterDisposable, RegisterDisposable);
    createSingletonService(IRegisterDrawable, RegisterDrawable);
    createSingletonService(IRegisterInitializable, RegisterInitializable);
    createSingletonService(IRegisterUpdatable, RegisterUpdatable);
};
