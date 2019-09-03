import { ErrorCode } from "../../../core/assert/Assert";
import { IRenderingGui } from "../../renderer/api/IRenderingGui";
import { GuiCanvas } from "../canvas/GuiCanvas";
import { IGuiCanvas } from "../IGuiCanvas";

export class MainRenderingGui implements IRenderingGui {
    private _canvas?: IGuiCanvas | undefined;

    get canvas(): IGuiCanvas {
        if (!this._canvas) {
            throw new ErrorCode(
                "Canvas Not set on Main rendering Gui",
                "canvas_not_set"
            );
        }
        return this._canvas;
    }

    public initialize() {
        this._canvas = new GuiCanvas();
        this._canvas.initialize();
    }
    public dispose(): void {
        if (this._canvas) {
            this._canvas.dispose();
            this._canvas = undefined;
        }
    }
}
