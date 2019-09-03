import { IEventService } from "../../core/event";
import { Inject } from "../../core/ioc";
import { IGameConfiguration } from "../settings/IGameSettings";
import { ICanvas } from "./ICanvas";
import { canvasInitialized } from "./initialized/CanvasInitialized";
import { CANVAS_RESET } from "./reset/CanvasReset";
import { canvasResetDone } from "./resetDone/CanvasResetDone";

export class GameSettingsBasedCanvas implements ICanvas {
    private _drawCanvas: HTMLCanvasElement | undefined;
    public get drawCanvas(): HTMLCanvasElement {
        if (!this._drawCanvas) {
            throw {
                message: "Canvas is not initialized",
                code: "canvas_not_initialized",
            };
        }
        return this._drawCanvas;
    }

    constructor(
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _gameSettings: IGameConfiguration = Inject(
            IGameConfiguration
        )
    ) {}
    public initialize() {
        this._eventService.on(CANVAS_RESET, this.reset, this);
        const drawCanvas = this.getDrawCanvas();
        const appendToElement = this.getAppendToElement();
        this._drawCanvas = drawCanvas;
        appendToElement.appendChild(drawCanvas);

        this._eventService.publish(canvasInitialized);
    }
    public dispose() {
        this._eventService.off(CANVAS_RESET, this.reset, this);
        if (this._drawCanvas) {
            this._drawCanvas.remove();
            this._drawCanvas = undefined;
        }
    }

    private reset() {
        this.dispose();
        this.initialize();
        this._eventService.publish(canvasResetDone);
    }
    private getDrawCanvas(): HTMLCanvasElement {
        const drawCanvas = this._drawCanvas || document.createElement("canvas");
        drawCanvas.style.width = "100%";
        drawCanvas.style.height = "100%";
        // Disable touch action, ie touch zooming
        drawCanvas.style.touchAction = "none";
        // Disable user Select, ie selection of text
        drawCanvas.style.userSelect = "none";
        // Make Tap Highlight transparent, touch event cause the canvas to highlight causing weird effect
        drawCanvas.style.webkitTapHighlightColor = "rgba(255, 255, 255, 0)";
        return drawCanvas;
    }
    private getAppendToElement(): HTMLElement {
        const appendToElement = document.getElementById(
            this._gameSettings.appendToTag
        );
        if (!appendToElement) {
            throw {
                message: "GameSettings.appendToTag not found.",
                code: "invalid_game_settings",
            };
        }
        return appendToElement;
    }
}
