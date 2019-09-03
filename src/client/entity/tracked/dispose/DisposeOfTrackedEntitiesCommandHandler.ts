import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../../core/command";
import { Inject } from "../../../../core/ioc";
import {
    IEntityTrackerDisposableService,
    IEntityTrackerService,
} from "../IEntityTrackerServices";
import {
    DISPOSE_OF_TRACKED_ENTITIES_COMMAND,
    DisposeOfTrackedEntitiesCommandResultType,
} from "./DisposeOfTrackedEntitiesCommand";

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
    public handle(): ICommandResult<DisposeOfTrackedEntitiesCommandResultType> {
        this._entityTrackerDisposableService.disposeOfTracked();
        return {
            success: true,
        };
    }
}
