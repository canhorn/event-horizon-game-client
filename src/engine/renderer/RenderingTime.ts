import { Inject } from "../ioc/Create";
import { IRenderingEngine } from "./api/IRenderingEngine";
import { IRenderingTime } from "./api/IRenderingTime";

export class RenderingTime implements IRenderingTime {
    constructor(
        private readonly _renderingEngine: IRenderingEngine = Inject(
            IRenderingEngine
        )
    ) {}

    get deltaTime(): number {
        return this._renderingEngine.engine.getDeltaTime();
    }
}
