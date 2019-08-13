import { ICanvas } from "./canvas/ICanvas";
import { ICommandHandlerRegister } from "./command/api/ICommandHandlerRegister";
import { IEventHandlerRegister } from "./event/IEventService";
import { preInitializeGui } from "./gui/PreInitializeGui";
import { preInitializeInput } from "./input/PreInitializeInput";
import { setupInputServices } from "./input/SetupInputServices";
import { Inject } from "./ioc/Create";
import { IRegisterDisposable } from "./lifecycle/register/IRegisterDisposable";
import { IRegisterInitializable } from "./lifecycle/register/IRegisterInitializable";
import { IRegisterUpdatable } from "./lifecycle/register/IRegisterUpdatable";
import { preInitializeLoading } from "./loading/PreInitializeLoading";
import { createLogger } from "./logger/InjectLoggerDecorator";
import { preInitializeParticle } from "./particle/PreInitializeParticle";
import { setupParticleServices } from "./particle/SetupParticleServices";
import { IBeforeRendering } from "./renderer/api/IBeforeRendering";
import { IRenderingEngine } from "./renderer/api/IRenderingEngine";
import { IRenderingGui } from "./renderer/api/IRenderingGui";
import { IRenderingScene } from "./renderer/api/IRenderingScene";
import { preInitializeEngineSystem } from "./system/PreInitializeEngineSystem";
import { setupEngineSystemServices } from "./system/SetupEngineSystemServices";

export class Engine {
    private _disposed: boolean = false;

    constructor(
        private readonly _logger = createLogger("Engine"),
        private readonly _canvas: ICanvas = Inject(ICanvas),
        private readonly _renderingEngine: IRenderingEngine = Inject(
            IRenderingEngine
        ),
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        ),
        private readonly _renderingGui: IRenderingGui = Inject(IRenderingGui),
        private readonly _registerInitializable: IRegisterInitializable = Inject(
            IRegisterInitializable
        ),
        private readonly _registerDisposable: IRegisterDisposable = Inject(
            IRegisterDisposable
        ),
        private readonly _registerUpdate: IRegisterUpdatable = Inject(
            IRegisterUpdatable
        ),
        private readonly _eventHandlerRegister: IEventHandlerRegister = Inject(
            IEventHandlerRegister
        ),
        private readonly _commandHandlerRegister: ICommandHandlerRegister = Inject(
            ICommandHandlerRegister
        ),
        private readonly _beforeRendering: IBeforeRendering = Inject(
            IBeforeRendering
        )
    ) {
        this._logger.debug("Starting Engine");
    }

    public setup() {
        this._disposed = false;
        this._logger.debug("setup");

        // Engine System Services
        setupEngineSystemServices();

        // Particle Services
        setupParticleServices();

        // Input services
        setupInputServices();
    }

    public dispose() {
        this._logger.debug("dispose");
        if (this._disposed) {
            return;
        }
        this._renderingGui.dispose();
        this._renderingScene.dispose();
        this._renderingEngine.dispose();
        this._canvas.dispose();
        this._eventHandlerRegister.dispose();
        this._commandHandlerRegister.dispose();
        this._registerDisposable.loop();
        this._disposed = true;
    }

    public preInitialize() {
        this._logger.debug("preInitialize");
        this._canvas.initialize();
        this._renderingEngine.initialize();
        this._renderingScene.initialize();
        this._renderingGui.initialize();

        // Engine System
        preInitializeEngineSystem();

        // Loading
        preInitializeLoading();

        // Particle
        preInitializeParticle();

        // Gui
        preInitializeGui();

        // Input
        preInitializeInput();
    }
    public postInitialize() {
        this._logger.debug("postInitialize");
        this._registerInitializable.loop();
    }

    public start() {
        this._logger.debug("start");
        this._renderingScene.scene.registerAfterRender(() =>
            this._registerUpdate.loop()
        );
        this._renderingEngine.engine.runRenderLoop(() => {
            this._renderingScene.scene.render();
        });
    }

    public registerBeforeRender(onUpdate: () => void) {
        this._logger.debug("registerBeforeRender");
        this._beforeRendering.register(onUpdate);
    }
}
