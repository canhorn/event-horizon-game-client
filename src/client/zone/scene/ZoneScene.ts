import { ICommandService } from "../../../engine/command/api/ICommandService";
import { debugEnabled } from "../../../engine/debugging/DebuggingActions";
import { DebuggingGui } from "../../../engine/debugging/gui/DebuggingGui";
import { IEventService } from "../../../engine/event/IEventService";
import { Inject } from "../../../engine/ioc/Create";
import { LifeCycleEntity } from "../../../engine/lifecycle/model/LifeCycleEntity";
import { createShowLoadingUiEvent } from "../../../engine/loading/show/ShowLoadingUiEvent";
import { createLogger } from "../../../engine/logger/InjectLoggerDecorator";
import { ILogger } from "../../../engine/logger/LoggerFactory";
import { IGameScene } from "../../../engine/scene/GameScene";
import { createStartZonePlayerConnectionCommand } from "../../server/zone/start/StartZonePlayerConnectionCommand";
import { createStopZonePlayerConnectionCommand } from "../../server/zone/stop/StopZonePlayerConnectionCommand";
import { ZoneRootGui } from "./gui/ZoneRootGui";

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
        // Load in root GUI
        new ZoneRootGui();
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
