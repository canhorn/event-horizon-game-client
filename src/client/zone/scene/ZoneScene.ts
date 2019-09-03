import { ICommandService } from "../../../core/command";
import { debugEnabled } from "../../../core/debugging/DebuggingActions";
import { IEventService } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { createLogger, ILogger } from "../../../core/logger";
import { DebuggingGui } from "../../../engine/debugging/gui/DebuggingGui";
import { LifeCycleEntity } from "../../../engine/lifecycle/model/LifeCycleEntity";
import { createShowLoadingUiEvent } from "../../../engine/loading/show/ShowLoadingUiEvent";
import { IGameScene } from "../../../engine/scene/GameScene";
import { createStartZonePlayerConnectionCommand } from "../../server/zone/start/StartZonePlayerConnectionCommand";
import { createStopZonePlayerConnectionCommand } from "../../server/zone/stop/StopZonePlayerConnectionCommand";

export class ZoneScene extends LifeCycleEntity implements IGameScene {
    constructor(
        private readonly _logger: ILogger = createLogger("ZoneScene"),
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {
        super();
    }
    public initialize(): void {
        this._logger.debug("Zone Scene Initialize");
        // Show Loading UI
        this._eventService.publish(createShowLoadingUiEvent({}));
        // Start the Zone Connection
        this._commandService.send(createStartZonePlayerConnectionCommand({}));
        // Load in Debugging GUI
        if (debugEnabled()) {
            new DebuggingGui();
        }
    }
    public update(): void {}
    public onDispose(): void {
        // Stop the Zone Connection
        this._commandService.send(createStopZonePlayerConnectionCommand({}));
    }
    public draw(): void {}
}
