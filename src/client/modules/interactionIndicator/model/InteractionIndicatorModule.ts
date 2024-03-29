import { IEventService } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { createLogger, ILogger } from "../../../../core/logger";
import { LifeCycleModule } from "../../../../engine/module/model/LifeCycleModule";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import { ServerParticle } from "../../../particle/model/ServerParticle";
import { createPlayerActionEvent } from "../../../player/action/PlayerActionEvent";
import { PlayerAction } from "../../../player/actions/api/PlayerActions";
import { RUN_INTERACTION_EVENT } from "../../interactionIndicator/run/RunInteractionEvent";
import { IInteractionIndicatorModule } from "../api/IInteractionIndicatorModule";
import { CLEAR_INTERACTION_INDICATOR_EVENT } from "../clear/ClearInteractionIndicatorEvent";
import {
    SHOW_INTERACTION_INDICATOR_EVENT,
    ShowInteractionIndicatorEventData,
} from "../show/ShowInteractionIndicatorEvent";

const INTERACTION_INDICATOR_TEMPLATE_ID: string = "Particle_Flame";

export default class InteractionIndicatorModule extends LifeCycleModule
    implements IInteractionIndicatorModule {
    private _activeParticle: ServerParticle;

    constructor(
        private readonly _entity: IObjectEntity,
        private readonly _logger: ILogger = createLogger(
            "InteractionIndicatorModule"
        ),
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
        this._activeParticle = new ServerParticle(
            this._entity,
            INTERACTION_INDICATOR_TEMPLATE_ID
        );
        this._eventService.on(
            SHOW_INTERACTION_INDICATOR_EVENT,
            this.onShow,
            this
        );
        this._eventService.on(
            CLEAR_INTERACTION_INDICATOR_EVENT,
            this.onClear,
            this
        );
        this._eventService.on(
            RUN_INTERACTION_EVENT,
            this.onRunInteractionCalled,
            this
        );
    }
    public update(): void {}
    public dispose(): void {
        this._eventService.off(
            SHOW_INTERACTION_INDICATOR_EVENT,
            this.onShow,
            this
        );
        this._eventService.off(
            CLEAR_INTERACTION_INDICATOR_EVENT,
            this.onClear,
            this
        );
        this._eventService.off(
            RUN_INTERACTION_EVENT,
            this.onRunInteractionCalled,
            this
        );
    }

    private onRunInteractionCalled() {
        if (this._activeParticle.running) {
            this._logger.debug("Run Interaction, Running");
            this._eventService.publish(
                createPlayerActionEvent({
                    action: PlayerAction.INTERACT,
                    data: this._entity.entityId,
                })
            );
        }
    }

    private onShow({ entityId }: ShowInteractionIndicatorEventData) {
        this._activeParticle.stop();
        if (this._entity.entityId !== entityId) {
            return;
        }
        this._activeParticle.start();
    }
    private onClear() {
        if (this._activeParticle.running) {
            this._activeParticle.stop();
        }
    }
}
