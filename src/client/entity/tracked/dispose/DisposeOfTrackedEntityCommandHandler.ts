import { ICommandHandler } from "../../../../core/command";
import { ICommandResult } from "../../../../core/command";
import { ICommandType } from "../../../../core/command";
import { Inject } from "../../../../core/ioc";
import { IEntityTrackerDisposableService } from "../IEntityTrackerServices";
import { DisposeOfTrackedEntityCommandResultType } from "./DisposeOfTrackedEntityCommand";
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
    }: DisposeOfTrackedEntityCommandData): ICommandResult<
        DisposeOfTrackedEntityCommandResultType
    > {
        this._entityTrackerDisposableService.disposeOfTrackedEntity(entityId);
        return {
            success: true,
        };
    }
}
