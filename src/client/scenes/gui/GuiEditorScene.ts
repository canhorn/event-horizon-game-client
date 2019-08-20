import { LifeCycleEntity } from "../../../engine/lifecycle/model/LifeCycleEntity";
import { createLogger } from "../../../engine/logger/InjectLoggerDecorator";
import { ILogger } from "../../../engine/logger/LoggerFactory";
import { IGameScene } from "../../../engine/scene/GameScene";
import { GuiEditorGui } from "./gui/GuiEditorGui";

export class GuiEditorScene extends LifeCycleEntity implements IGameScene {
    private mainMenu?: GuiEditorGui;
    constructor(
        private readonly _logger: ILogger = createLogger("MainMenuScene")
    ) {
        super();
    }
    public initialize(): void {
        this._logger.debug("Gui Editor Scene Initialize");
        this.mainMenu = new GuiEditorGui();
    }
    public update(): void {}
    public onDispose(): void {
        if (this.mainMenu) {
            this.mainMenu.dispose();
        }
    }
    public draw(): void {}
}
