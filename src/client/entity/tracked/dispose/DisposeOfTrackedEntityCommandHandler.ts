import { ICommandHandler } from "../../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { Inject } from "../../../../engine/ioc/Create";
import { IEntityTrackerDisposableService } from "../IEntityTrackerServices";
import {
    DISPOSE_OF_TRACKED_ENTITY_COMMAND,
    DisposeOfTrackedEntityCommandData,
} from "./DisposeOfTrackedEntityCommand";

/**
 * Name: DisposeOfTrackedEntityCommand
 * Type: Command
 */
export class DisposeOfTrackedEntityCommandHandler implements ICommandHandler {
    public type: ICommandType = DISPOSE_OF_TRACKED_ENTITY_COMMAND;
    constructor(
        private readonly _entityTrackerDisposableService: IEntityTrackerDisposableService = Inject(
            IEntityTrackerDisposableService
        )
    ) {}
    public handle({
        entityId,
    }: DisposeOfTrackedEntityCommandData): ICommandResult {
        this._entityTrackerDisposableService.disposeOfTrackedEntity(entityId);
        return {
            success: true,
        };
    }
}
