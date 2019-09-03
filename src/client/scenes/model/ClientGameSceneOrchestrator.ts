import { ICommandHandlerRegister } from "../../../core/command";
import { Inject } from "../../../core/ioc";
import { LifeCycleEntity } from "../../../engine/lifecycle/model/LifeCycleEntity";
import { IGameScene } from "../../../engine/scene/GameScene";
import { ISceneOrchestrationOptions } from "../api/ISceneOrchestrationOptions";
import { StartSceneCommandHandler } from "../start/StartSceneCommandHandler";
import {
    clearSceneOrchestratorState,
    setOrchestratorToDefaultScene,
    setSceneOrchestratorOptions,
} from "../state/SceneOrchestratorState";

export class ClientGameSceneOrchestrator extends LifeCycleEntity {
    private runningScene?: IGameScene = undefined;

    constructor(
        options: ISceneOrchestrationOptions,
        private readonly _commandHandlerRegister: ICommandHandlerRegister = Inject(
            ICommandHandlerRegister
        )
    ) {
        super();
        clearSceneOrchestratorState();
        setSceneOrchestratorOptions(options);
    }
    public initialize(): void {
        // Setup Events/Commands/Queries
        this._commandHandlerRegister.register(StartSceneCommandHandler);

        setOrchestratorToDefaultScene();
    }
    public onDispose(): void {
        if (this.runningScene) {
            this.runningScene.dispose();
        }
    }
    public update(): void {}
    public draw(): void {}
}
