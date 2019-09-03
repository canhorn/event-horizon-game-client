import { createLogger, ILogger } from "../../../core/logger";
import { LifeCycleEntity } from "../../../engine/lifecycle/model/LifeCycleEntity";
import { IGameScene } from "../../../engine/scene/GameScene";
import { MainMenuGui } from "./gui/MainMenuGui";

export class MainMenuScene extends LifeCycleEntity implements IGameScene {
    private mainMenu?: MainMenuGui;
    constructor(
        private readonly _logger: ILogger = createLogger("MainMenuScene")
    ) {
        super();
    }
    public initialize(): void {
        this._logger.debug("Main Menu Scene Initialize");
        this.mainMenu = new MainMenuGui();
    }
    public update(): void {}
    public onDispose(): void {
        if (this.mainMenu) {
            this.mainMenu.dispose();
        }
    }
    public draw(): void {}
}
