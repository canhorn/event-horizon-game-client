import objectMerge from "../../../core/object/ObjectMerge";
import { IGameScene } from "../../../engine/scene/GameScene";
import { ISceneOrchestrationOptions } from "../api/ISceneOrchestrationOptions";

const STATE: ISceneOrchestratorState = {};

export const setSceneOrchestratorOptions = (
    options: ISceneOrchestrationOptions
) =>
    objectMerge(STATE, {
        options,
    });
export const clearSceneOrchestratorState = () => {
    if (STATE.runningScene) {
        STATE.runningScene.dispose();
    }
    objectMerge(STATE, {
        options: undefined,
        runningScene: undefined,
        runningSceneId: undefined,
    });
};
export const setRunningOrchestratorScene = (sceneId: string) => {
    if (!STATE.options) {
        throw {
            code: "invalid_scene_options",
            message: "Scene Orchestrator are not setup. Could not start.",
        };
    }
    const runningSceneBuilder = STATE.options.scenes.getValue(sceneId);
    if (runningSceneBuilder) {
        if (STATE.runningScene) {
            STATE.runningScene.dispose();
            STATE.runningScene = undefined;
        }
        const runningScene = new runningSceneBuilder.build();
        objectMerge(STATE, {
            runningScene,
            runningSceneId: sceneId,
        });
        return;
    }
    throw {
        code: "invalid_scene_id",
        message: "Scene was not found. Could not start.",
    };
};
export const setOrchestratorToDefaultScene = () => {
    if (!STATE.options) {
        throw {
            code: "invalid_scene_options",
            message: "Scene Orchestrator are not setup. Could not start.",
        };
    }
    setRunningOrchestratorScene(STATE.options.defaultSceneId);
};

interface ISceneOrchestratorState {
    options?: ISceneOrchestrationOptions;
    runningSceneId?: string;
    runningScene?: IGameScene;
}
