import { ICommandHandler } from "../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../engine/command/api/ICommandResult";
import { ICommandService } from "../../../engine/command/api/ICommandService";
import { ICommandType } from "../../../engine/command/api/ICommandType";
import { Inject } from "../../../engine/ioc/Create";
import { createDisposeOfTrackedEntitiesCommand } from "../../entity/tracked/dispose/DisposeOfTrackedEntitiesCommand";
import { setRunningOrchestratorScene } from "../state/SceneOrchestratorState";
import {
    START_SCENE_COMMAND,
    StartSceneCommandData,
} from "./StartSceneCommand";

/**
 * Name: StartSceneCommand
 * Type: Command
 */
export class StartSceneCommandHandler implements ICommandHandler {
    public type: ICommandType = START_SCENE_COMMAND;
    constructor(
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}
    public handle({ sceneId }: StartSceneCommandData): ICommandResult {
        this._commandService.send(createDisposeOfTrackedEntitiesCommand({}));
        setRunningOrchestratorScene(sceneId);
        return {
            success: true,
        };
    }
}
