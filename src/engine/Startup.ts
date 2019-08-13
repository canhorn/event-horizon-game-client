import { performanceTimer, performanceTimerEnd } from "./debugging/Performance";
import { Engine } from "./Engine";
import { Game } from "./Game";
import { createSingletonProviderService } from "./ioc/Create";
import { IStartup } from "./IStartup";
import { createLogger } from "./logger/InjectLoggerDecorator";
import { ILogger } from "./logger/LoggerFactory";
import { GameSettingsWrapper } from "./settings/GameSettingsWrapper";
import { IGameConfiguration } from "./settings/IGameSettings";
import { cleanUpSystemServices } from "./system/CleanUpSystemServices";
import { setupExposedServices } from "./system/SetupExposedServices";
import { setupGlobalSystemServices } from "./system/SetupGlobalSystemServices";

setupGlobalSystemServices();
setupExposedServices();

export class Startup implements IStartup {
    private _configuration: IGameConfiguration;
    private _gameType: new () => Game;
    private _engine!: Engine;
    private _game!: Game;

    private readonly _logger: ILogger;

    constructor(configuration: IGameConfiguration, gameType: new () => Game) {
        this._logger = createLogger("Startup");

        this._configuration = configuration;
        this._gameType = gameType;
        createSingletonProviderService(IGameConfiguration, {
            get: () => new GameSettingsWrapper(this._configuration),
        });
        createSingletonProviderService(IStartup, {
            get: () => this,
        });
    }

    public restart() {
        this.stop();
        this.run();
    }

    public run(): void {
        performanceTimer("[Startup]: Run");
        this._engine = new Engine();
        this._game = new this._gameType();
        this.setup();
        this.doInitialize();
        this.doStart();
        this._logger.log(
            "Run performance: ",
            performanceTimerEnd("[Startup]: Run")
        );
    }
    public stop(): void {
        this.dispose();
    }

    private dispose(): void {
        this._logger.log("Disposing");
        this._engine.dispose();
        this._game.dispose();
        cleanUpSystemServices();
    }

    private setup(): void {
        this._logger.log("Setup");
        this._engine.setup();
        this._game.setup();
    }

    private doInitialize(): void {
        this._logger.log("Initializing");
        this._engine.preInitialize();
        this._game.initialize();
        this._engine.postInitialize();
        this._engine.registerBeforeRender(() => this._game.update());
    }

    private doStart(): void {
        this._logger.log("Starting");
        this._engine.start();
        this._game.start();
    }
}
