import { AdvancedDynamicTexture } from "babylonjs-gui";
import { ErrorCode } from "../../assert/Assert";
import { Inject } from "../../ioc/Create";
import { IRenderingScene } from "../../renderer/api/IRenderingScene";
import { IGuiCanvas } from "../IGuiCanvas";

export class GuiCanvas implements IGuiCanvas {
    private _uiTexture?: AdvancedDynamicTexture;

    constructor(
        private _renderingScene: IRenderingScene = Inject(IRenderingScene)
    ) {}

    public get root() {
        if (!this._uiTexture) {
            throw new ErrorCode(
                "GuiCanvas UI Texture is not valid",
                "ui_texture_invalid"
            );
        }
        return this._uiTexture;
    }
    public initialize(): void {
        this._uiTexture = AdvancedDynamicTexture.CreateFullscreenUI(
            "ROOT_GUI",
            true,
            this._renderingScene.scene
        );
    }
    public dispose(): void {
        if (this._uiTexture) {
            this._uiTexture.dispose();
        }
    }
}
