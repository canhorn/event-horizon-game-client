import { ICommand } from "../../../engine/command/api/ICommand";
import { ICommandType } from "../../../engine/command/api/ICommandType";
import { CommandType } from "../../../engine/command/model/CommandType";
import { ISceneOrchestrationOptions } from "../api/ISceneOrchestrationOptions";

/**
 * Type: CreateGameSceneOrchestratorCommand
 * NameSpace: Scene
 * Type: Command
 */
export const CREATE_GAME_SCENE_ORCHESTRATOR_COMMAND = new CommandType(
    "Scene.CREATE_GAME_SCENE_ORCHESTRATOR_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = CREATE_GAME_SCENE_ORCHESTRATOR_COMMAND;
    public data?: CreateGameSceneOrchestratorCommandData;
}
const instanceOfCommand = new CommandClass();
export const createCreateGameSceneOrchestratorCommand = (
    data: CreateGameSceneOrchestratorCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface CreateGameSceneOrchestratorCommandData {
    sceneOrchestrationOptions: ISceneOrchestrationOptions;
}
