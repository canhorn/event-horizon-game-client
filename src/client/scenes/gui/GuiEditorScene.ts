import { LifeCycleEntity } from "../../../engine/lifecycle/model/LifeCycleEntity";
import { createLogger } from "../../../engine/logger/InjectLoggerDecorator";
import { ILogger } from "../../../engine/logger/LoggerFactory";
import { IGameScene } from "../../../engine/scene/GameScene";
import { setClientScriptTemplate } from "../../../engine/system/client/scripts/store/ClientScriptTemplateStore";
import { DataDrivenGuiLayout } from "./gui/builder/DataDrivenGuiLayout";
import GuiLayoutData from "./gui/Gui.dialog.json";

export class GuiEditorScene extends LifeCycleEntity implements IGameScene {
    private gui?: DataDrivenGuiLayout;
    constructor(
        private readonly _logger: ILogger = createLogger("MainMenuScene")
    ) {
        super();
    }
    public initialize(): void {
        this._logger.debug("Gui Editor Scene Initialize");
        // this.mainMenu = new GuiEditorGui();
        setClientScriptTemplate({
            name: "Local_GuiLayout_Initialize.js",
            scriptFileName: "Initialize.js",
            scriptPath: "Local_GuiLayout",
            scriptString:
                '$services.logger.debug("hello, _initialized: " + $data._initialized)',
        });
        setClientScriptTemplate({
            name: "Local_GuiLayout_Dispose.js",
            scriptFileName: "Dispose.js",
            scriptPath: "Local_GuiLayout",
            scriptString: '$services.logger.debug("hello")',
        });
        setClientScriptTemplate({
            name: "Local_GuiLayout_Layout.js",
            scriptFileName: "Update.js",
            scriptPath: "Local_GuiLayout",
            scriptString: "",
        });
        setClientScriptTemplate({
            name: "Local_GuiLayout_GoToGame.js",
            scriptFileName: "GoToGame.js",
            scriptPath: "Local_GuiLayout",
            scriptString:
                '$services.commandService.send($utils.createEvent("ClientScenes.START_SCENE_COMMAND",{ sceneId: "zone" } ))',
        });
        setClientScriptTemplate({
            name: "Local_GuiLayout_GoToAccountDetails.js",
            scriptFileName: "GoToAccountDetails.js",
            scriptPath: "Local_GuiLayout",
            scriptString:
                '$services.commandService.send($utils.createEvent("ClientScenes.START_SCENE_COMMAND",{ sceneId: "account-details" } ))',
        });

        this.gui = new DataDrivenGuiLayout(GuiLayoutData);
        this.gui.activate();
    }
    public update(): void {}
    public onDispose(): void {
        if (this.gui) {
            this.gui.dispose();
        }
    }
    public draw(): void {}
}
