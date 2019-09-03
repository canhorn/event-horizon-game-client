import { autobind } from "../../../../core/autobind/autobind";
import { IEventService } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { throttle } from "../../../../core/throttle/Throttle";
import { IEntity } from "../../../../engine/entity/api/IEntity";
import { LifeCycleModule } from "../../../../engine/module/model/LifeCycleModule";
import {
    ENTITY_MOVING_EVENT,
    EntityMovingEventData,
} from "../../../entity/moving/EntityMovingEvent";
import {
    ENTITY_STOPPING_EVENT,
    EntityStoppingEventData,
} from "../../../entity/stopping/EntityStoppingEvent";
import { createPlayAnimationEvent } from "../../animation/play/PlayAnimationEvent";
import { IAnimationActionModule } from "../api/IAnimationActionModule";

export class AnimationActionModule extends LifeCycleModule
    implements IAnimationActionModule {
    private _handler: number = -1;
    private _stopMovement: boolean = false;

    private onEntityMovingHandle: any = undefined;
    private onEntityStoppingHandle: any = undefined;

    constructor(
        private _entity: IEntity,
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
        this.onEntityMovingHandle = throttle(this.onEntityMoving, 100, this);
        this.onEntityStoppingHandle = throttle(this.onEntityStopping, 50, this);

        this._eventService.on(
            ENTITY_MOVING_EVENT,
            this.onEntityMovingHandle,
            this
        );
        this._eventService.on(
            ENTITY_STOPPING_EVENT,
            this.onEntityStoppingHandle,
            this
        );
        this._handler = window.setInterval(this.checkStopMovement, 100);
    }
    public dispose(): void {
        this._eventService.off(
            ENTITY_MOVING_EVENT,
            this.onEntityMovingHandle,
            this
        );
        this._eventService.off(
            ENTITY_STOPPING_EVENT,
            this.onEntityStoppingHandle,
            this
        );
        window.clearInterval(this._handler);
    }
    public update(): void {
        // Nothing to update
    }

    private onEntityMoving({ entityId }: EntityMovingEventData) {
        if (this._entity.id !== entityId) {
            return;
        }
        this._eventService.publish(
            createPlayAnimationEvent({
                entityId: this._entity.id,
                animation: "Running",
            })
        );
        this._stopMovement = false;
    }

    private onEntityStopping({ entityId }: EntityStoppingEventData) {
        if (this._entity.id !== entityId) {
            return;
        }
        this._stopMovement = true;
    }

    @autobind
    private checkStopMovement() {
        if (this._stopMovement) {
            this._eventService.publish(
                createPlayAnimationEvent({
                    entityId: this._entity.id,
                    animation: "Idle",
                })
            );
            this._stopMovement = false;
        }
    }
}
