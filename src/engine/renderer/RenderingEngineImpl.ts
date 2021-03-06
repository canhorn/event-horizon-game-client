import { Engine } from "babylonjs";
import { assert } from "../../core/assert/Assert";
import { Inject } from "../../core/ioc";
import { ICanvas } from "../canvas/ICanvas";
import { IRenderingEngine } from "./api/IRenderingEngine";

export class RenderingEngineImpl implements IRenderingEngine {
    private _engine!: Engine;
    get engine(): Engine {
        return this._engine;
    }

    constructor(private readonly _canvas: ICanvas = Inject(ICanvas)) {}

    public initialize() {
        assert(this._canvas.drawCanvas);
        this._engine = new Engine(this._canvas.drawCanvas, true, {
            preserveDrawingBuffer: true,
        });
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
        this.engine.resize();
    }
    public dispose(): void {
        this._engine.dispose();
    }
}
