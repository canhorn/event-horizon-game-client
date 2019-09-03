import { CommandType, ICommand, ICommandType } from "../../../core/command";
import { ISceneOrchestrationOptions } from "../api/ISceneOrchestrationOptions";

/**
 * Name: CreateGameSceneOrchestratorCommand
 * NameSpace: Scene
 * Type: Command
 */
export const CREATE_GAME_SCENE_ORCHESTRATOR_COMMAND = new CommandType(
    "Scene.CREATE_GAME_SCENE_ORCHESTRATOR_COMMAND"
);
class CommandClass
    implements
        ICommand<
            CreateGameSceneOrchestratorCommandData,
            CreateGameSceneOrchestratorCommandResultType
        > {
    public type: ICommandType = CREATE_GAME_SCENE_ORCHESTRATOR_COMMAND;
    public data?: CreateGameSceneOrchestratorCommandData;
}
const instanceOfCommand = new CommandClass();
export const createCreateGameSceneOrchestratorCommand = (
    data: CreateGameSceneOrchestratorCommandData
): ICommand<
    CreateGameSceneOrchestratorCommandData,
    CreateGameSceneOrchestratorCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface CreateGameSceneOrchestratorCommandData {
    sceneOrchestrationOptions: ISceneOrchestrationOptions;
}
export type CreateGameSceneOrchestratorCommandResultType = undefined;
