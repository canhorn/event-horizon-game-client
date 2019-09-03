import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../core/command";
import { ClientGameSceneOrchestrator } from "../model/ClientGameSceneOrchestrator";
import {
    CREATE_GAME_SCENE_ORCHESTRATOR_COMMAND,
    CreateGameSceneOrchestratorCommandData,
    CreateGameSceneOrchestratorCommandResultType,
} from "./CreateGameSceneOrchestratorCommand";

/**
 * Name: CreateGameSceneOrchestratorCommand
 * Type: Command
 */
export class CreateGameSceneOrchestratorCommandHandler
    implements ICommandHandler {
    public type: ICommandType = CREATE_GAME_SCENE_ORCHESTRATOR_COMMAND;
    constructor() {}
    public handle({
        sceneOrchestrationOptions,
    }: CreateGameSceneOrchestratorCommandData): ICommandResult<
        CreateGameSceneOrchestratorCommandResultType
    > {
        new ClientGameSceneOrchestrator(sceneOrchestrationOptions);
        return {
            success: true,
        };
    }
}
