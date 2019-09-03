import { ICommandService } from "../../../../../core/command";
import { Inject } from "../../../../../core/ioc";
import { createLogger, ILogger } from "../../../../../core/logger";
import { createActivateGuiCommand } from "../../../../../engine/gui/activate/ActivateGuiCommand";
import { createCreateGuiCommand } from "../../../../../engine/gui/create/CreateGuiCommand";
import { createDisposeOfGuiCommand } from "../../../../../engine/gui/dispose/DisposeOfGuiCommand";
import { LifeCycleModule } from "../../../../../engine/module/model/LifeCycleModule";
import { setClientScriptTemplate } from "../../../../../engine/system/client/scripts/store/ClientScriptTemplateStore";
import { IObjectEntity } from "../../../../entity/api/IObjectEntity";
import { ISandboxModule } from "../api/ISandboxModule";
import DialogGuiJson from "./gui/Dialog.Gui.json";

export class SandboxModule extends LifeCycleModule implements ISandboxModule {
    constructor(
        private readonly _entity: IObjectEntity,
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        ),
        private readonly _logger: ILogger = createLogger("SandboxModule")
    ) {
        super();
        this.initialize();
    }
    public update(): void {}
    public dispose(): void {
        this._commandService.send(
            createDisposeOfGuiCommand({ id: DialogGuiJson.id })
        );
    }
    private initialize() {
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
        setClientScriptTemplate({
            name: "Local_GuiLayout_GoToMainMenu.js",
            scriptFileName: "GoToMainMenu.js",
            scriptPath: "Local_GuiLayout",
            scriptString:
                '$services.commandService.send($utils.createEvent("ClientScenes.START_SCENE_COMMAND",{ sceneId: "main-menu" } ))',
        });
        setClientScriptTemplate({
            name: "Local_GuiLayout_Hide.js",
            scriptFileName: "Hide.js",
            scriptPath: "Local_GuiLayout",
            scriptString: `$services.commandService.send($utils.createEvent("Engine.Gui.HIDE_GUI_COMMAND",{ id: "gui_dialog" } ))`,
        });

        this._commandService.send(
            createCreateGuiCommand({
                id: DialogGuiJson.id,
                layoutId: DialogGuiJson.id,
            })
        );
        this._commandService.send(
            createActivateGuiCommand({
                id: DialogGuiJson.id,
            })
        );
    }
}
