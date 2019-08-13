import { ICommandHandler } from "../../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { Inject } from "../../../../engine/ioc/Create";
import {
    IEntityTrackerDisposableService,
    IEntityTrackerService,
} from "../IEntityTrackerServices";
import { DISPOSE_OF_TRACKED_ENTITIES_COMMAND } from "./DisposeOfTrackedEntitiesCommand";

/**
 * Name: DisposeOfTrackedEntitiesCommand
 * Type: Command
 */
export class DisposeOfTrackedEntitiesCommandHandler implements ICommandHandler {
    public type: ICommandType = DISPOSE_OF_TRACKED_ENTITIES_COMMAND;
    constructor(
        private readonly _entityTrackerDisposableService: IEntityTrackerDisposableService = Inject(
            IEntityTrackerService
        )
    ) {}
    public handle(): ICommandResult {
        this._entityTrackerDisposableService.disposeOfTracked();
        return {
            success: true,
        };
    }
}
