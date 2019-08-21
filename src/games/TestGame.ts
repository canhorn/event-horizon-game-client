import { useLocalShimServices } from "../_localShim/UseLocalShimServices";
import { createSetupAccountCommand } from "../client/account/setup/SetupAccountCommand";
import { WorldFreeCamera } from "../client/entity/camera/model/WorldFreeCamera";
import { AccountDetailsScene } from "../client/scenes/accountDetails/AccountDetailsScene";
import { createCreateGameSceneOrchestratorCommand } from "../client/scenes/create/CreateGameSceneOrchestratorCommand";
import { GuiEditorScene } from "../client/scenes/gui/GuiEditorScene";
import { MainMenuScene } from "../client/scenes/mainMenu/MainMenuScene";
import { createStartCoreServerConnectionCommand } from "../client/server/core/start/StartCoreServerConnectionCommand";
import { useClientService } from "../client/UseClientService";
import { ZoneScene } from "../client/zone/scene/ZoneScene";
import { Dictionary } from "../core/collection/Dictionary";
import { ICommandService } from "../engine/command/api/ICommandService";
import { Game } from "../engine/Game";
import { createSingletonProviderService, Inject } from "../engine/ioc/Create";
import { createLogger } from "../engine/logger/InjectLoggerDecorator";
import { ILogger } from "../engine/logger/LoggerFactory";

export class TestGame implements Game {
    public _startupCamera!: WorldFreeCamera;

    constructor(
        private readonly _logger: ILogger = createLogger("TestGame"),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}

    public configureServices(): void {
        createSingletonProviderService(Game, {
            get: () => this,
        });
        useClientService();
        useLocalShimServices();
    }
    public setup(): void {
        this._logger.debug("Staring");
        this.configureServices();
        // Default Camera
        this._startupCamera = new WorldFreeCamera();

        // Setup Account Service
        this._commandService.send(createSetupAccountCommand({}));
        // Start Connection To Core Server
        this._commandService.send(createStartCoreServerConnectionCommand({}));
        // Setup the Scene Orchestrator
        this._commandService.send(
            createCreateGameSceneOrchestratorCommand({
                sceneOrchestrationOptions: {
                    defaultSceneId: "gui-editor",
                    scenes: Dictionary.fromJSON({
                        "main-menu": {
                            build: MainMenuScene,
                        },
                        "gui-editor": {
                            build: GuiEditorScene,
                        },
                        "account-details": {
                            build: AccountDetailsScene,
                        },
                        zone: {
                            build: ZoneScene,
                        },
                    }),
                },
            })
        );
    }
    public initialize(): void {
        this._logger.debug("Initialize");
    }
    public start(): void {
        this._logger.debug("Starting");
    }
    public dispose(): void {
        this._logger.debug("Disposing");
    }
    public update(): void {
        // Nothing to update
    }
}
