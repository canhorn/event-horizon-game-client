import { Tools } from "babylonjs";
import { EventType, IEventHandler } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { ICanvas } from "../../canvas/ICanvas";
import { IRenderingEngine } from "../../renderer/api/IRenderingEngine";
import { IRenderingScene } from "../../renderer/api/IRenderingScene";
import { TAKE_SCREENSHOT_EVENT } from "./TakeScreenshotEvent";

export class TakeScreenshotHandler implements IEventHandler {
    public type: EventType = TAKE_SCREENSHOT_EVENT;

    constructor(
        private readonly _engine: IRenderingEngine = Inject(IRenderingEngine),
        private readonly _scene: IRenderingScene = Inject(IRenderingScene),
        private readonly _canvas: ICanvas = Inject(ICanvas)
    ) {}

    public handle() {
        if (this._scene.scene.activeCamera) {
            Tools.CreateScreenshot(
                this._engine.engine,
                this._scene.scene.activeCamera,
                {
                    width: this._canvas.drawCanvas.width,
                    height: this._canvas.drawCanvas.height,
                }
            );
        }
    }
}
