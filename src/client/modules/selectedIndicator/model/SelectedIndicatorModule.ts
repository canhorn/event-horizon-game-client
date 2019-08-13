import { IEventService } from "../../../../engine/event/IEventService";
import { Inject } from "../../../../engine/ioc/Create";
import { createLogger } from "../../../../engine/logger/InjectLoggerDecorator";
import { ILogger } from "../../../../engine/logger/LoggerFactory";
import { LifeCycleModule } from "../../../../engine/module/model/LifeCycleModule";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import { ServerParticle } from "../../../particle/model/ServerParticle";
import { CLEAR_POINTER_HIT_ENTITY_EVENT } from "../../../systems/screenPointer/clear/ClearPointerHitEntityEvent";
import {
    POINTER_HIT_ENTITY_EVENT,
    PointerHitEntityEventData,
} from "../../../systems/screenPointer/entity/PointerHitEntityEvent";
import { ISelectedIndicatorModule } from "../api/ISelectedIndicatorModule";

const SELECTED_INDICATOR_TEMPLATE_ID: string = "Particle_SelectedIndicator";

export default class SelectedIndicatorModule extends LifeCycleModule
    implements ISelectedIndicatorModule {
    private _activeParticle: ServerParticle;

    constructor(
        private readonly _entity: IObjectEntity,
        private readonly _logger: ILogger = createLogger(
            "SelectedIndicatorModule"
        ),
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
        this._activeParticle = new ServerParticle(
            this._entity,
            SELECTED_INDICATOR_TEMPLATE_ID
        );
        this._eventService.addEventListener(
            POINTER_HIT_ENTITY_EVENT,
            this.onPickHitEntity,
            this
        );
        this._eventService.addEventListener(
            CLEAR_POINTER_HIT_ENTITY_EVENT,
            this.onClearPickHitEntity,
            this
        );
    }
    public update(): void {}
    public dispose(): void {
        this._eventService.removeEventListener(
            POINTER_HIT_ENTITY_EVENT,
            this.onPickHitEntity,
            this
        );
        this._eventService.removeEventListener(
            CLEAR_POINTER_HIT_ENTITY_EVENT,
            this.onClearPickHitEntity,
            this
        );
    }

    private onPickHitEntity({ entityId }: PointerHitEntityEventData) {
        this._activeParticle.stop();
        this._logger.debug(this._entity.getProperty("id"));
        if (this._entity.getProperty("id") !== entityId) {
            return;
        }
        this._activeParticle.start();
    }
    private onClearPickHitEntity() {
        if (this._activeParticle.running) {
            this._activeParticle.stop();
        }
    }
}
