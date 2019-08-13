import { IDictionary } from "../../../core/collection/IDictionary";
import { IGameScene } from "../../../engine/scene/GameScene";

export interface ISceneOrchestrationOptions {
    defaultSceneId: string;
    scenes: IDictionary<string, ISceneBuilder>;
}
export interface ISceneBuilder {
    build: new () => IGameScene;
}
