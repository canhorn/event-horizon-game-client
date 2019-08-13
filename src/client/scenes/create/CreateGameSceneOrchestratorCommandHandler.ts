import { ICommandHandler } from "../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../engine/command/api/ICommandType";
import { ClientGameSceneOrchestrator } from "../model/ClientGameSceneOrchestrator";
import {
    CREATE_GAME_SCENE_ORCHESTRATOR_COMMAND,
    CreateGameSceneOrchestratorCommandData,
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
    }: CreateGameSceneOrchestratorCommandData): ICommandResult {
        new ClientGameSceneOrchestrator(sceneOrchestrationOptions);
        return {
            success: true,
        };
    }
}
