import { Inject } from "../../../core/ioc";
import { IRenderingEngine } from "../../renderer/api/IRenderingEngine";

export const getFPS = (
    renderingEngine: IRenderingEngine = Inject(IRenderingEngine)
) => renderingEngine.engine && renderingEngine.engine.getFps();
