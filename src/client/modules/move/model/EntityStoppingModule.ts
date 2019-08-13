import { IEventService } from "../../../../engine/event/IEventService";
import { Inject } from "../../../../engine/ioc/Create";
import { LifeCycleModule } from "../../../../engine/module/model/LifeCycleModule";
import { CLIENT_ACTION_ENTITY_STOPPING_EVENT } from "../../../action/api/ClientAction_EntityStopping";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import { createEntityStoppingEvent } from "../../../entity/stopping/EntityStoppingEvent";

export class EntityStoppingModule extends LifeCycleModule {
    public enabled: boolean = true;

    constructor(
        protected readonly _entity: IObjectEntity,
        protected readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
        this._eventService.addEventListener(
            CLIENT_ACTION_ENTITY_STOPPING_EVENT,
            this.emitEntityMovingEvent,
            this
        );
    }

    public update(): void {
        // Nothing to keep track of here
    }
    public dispose(): void {
        this._eventService.addEventListener(
            CLIENT_ACTION_ENTITY_STOPPING_EVENT,
            this.emitEntityMovingEvent,
            this
        );
    }

    private emitEntityMovingEvent() {
        this._eventService.publish(
            createEntityStoppingEvent({
                entityId: this._entity.id,
            })
        );
    }
}
