import { ICommandHandler } from "../../../core/command";
import { ICommandResult } from "../../../core/command";
import { ICommandService } from "../../../core/command";
import { ICommandType } from "../../../core/command";
import { Inject } from "../../../core/ioc";
import { createDisposeOfTrackedEntitiesCommand } from "../../entity/tracked/dispose/DisposeOfTrackedEntitiesCommand";
import { setRunningOrchestratorScene } from "../state/SceneOrchestratorState";
import { StartSceneCommandResultType } from "./StartSceneCommand";
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
    public handle({
        sceneId,
    }: StartSceneCommandData): ICommandResult<StartSceneCommandResultType> {
        this._commandService.send(createDisposeOfTrackedEntitiesCommand({}));
        setRunningOrchestratorScene(sceneId);
        return {
            success: true,
        };
    }
}
