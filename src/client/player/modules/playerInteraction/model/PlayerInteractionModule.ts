import { autobind } from "../../../../../core/autobind/autobind";
import { Dictionary } from "../../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../../core/collection/IDictionary";
import {
    isObjectDefined,
    isObjectNotDefined,
} from "../../../../../core/object/ObjectCheck";
import { IEventService } from "../../../../../engine/event/IEventService";
import { Inject } from "../../../../../engine/ioc/Create";
import { createLogger } from "../../../../../engine/logger/InjectLoggerDecorator";
import { ILogger } from "../../../../../engine/logger/LoggerFactory";
import { LifeCycleModule } from "../../../../../engine/module/model/LifeCycleModule";
import { IObjectEntity } from "../../../../entity/api/IObjectEntity";
import { createClearInteractionIndicatorEvent } from "../../../../modules/interactionIndicator/clear/ClearInteractionIndicatorEvent";
import { createShowInteractionIndicatorEvent } from "../../../../modules/interactionIndicator/show/ShowInteractionIndicatorEvent";
import { ServerParticle } from "../../../../particle/model/ServerParticle";
import { PlayerEntity } from "../../../model/PlayerEntity";
import { IPlayerInteractionModule } from "../api/IPlayerInteractionModule";
import {
    ENTITY_LEFT_INTERACTION_DISTANCE_EVENT,
    EntityLeftInteractionDistanceEventData,
} from "../withIn/EntityLeftInteractionDistanceEvent";
import {
    ENTITY_WITHIN_INTERACTION_DISTANCE_EVENT,
    EntityWithinInteractionDistanceEventData,
} from "../withIn/EntityWithinInteractionDistanceEvent";

export default class PlayerInteractionModule extends LifeCycleModule
    implements IPlayerInteractionModule {
    private _distanceEntityMap: IDictionary<
        number,
        IInteractionItem
    > = new Dictionary();
    constructor(
        private readonly _entity: PlayerEntity,
        private readonly _logger: ILogger = createLogger(
            "PlayerInteractionModule"
        ),
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
        _eventService.addEventListener(
            ENTITY_WITHIN_INTERACTION_DISTANCE_EVENT,
            this.onEntityWithinDistance,
            this
        );

        _eventService.addEventListener(
            ENTITY_LEFT_INTERACTION_DISTANCE_EVENT,
            this.onEntityLeft,
            this
        );
    }
    public update(): void {}
    public dispose(): void {
        this._eventService.removeEventListener(
            ENTITY_WITHIN_INTERACTION_DISTANCE_EVENT,
            this.onEntityWithinDistance,
            this
        );
    }

    private onEntityWithinDistance({
        entity,
        distanceToPlayer,
    }: EntityWithinInteractionDistanceEventData): void {
        this._distanceEntityMap.setValue(entity.entityId, {
            entity,
            distanceToPlayer,
        });
        this.calculateFocus();
    }

    private onEntityLeft({
        entity,
    }: EntityLeftInteractionDistanceEventData): void {
        this._distanceEntityMap.remove(entity.entityId);
        this.calculateFocus();
    }
    private calculateFocus() {
        const interactionItem = this._distanceEntityMap
            .values()
            .sort(
                (entityA, entityB) =>
                    entityA.distanceToPlayer - entityB.distanceToPlayer
            )[0];
        if (isObjectNotDefined(interactionItem)) {
            this._eventService.publish(
                createClearInteractionIndicatorEvent({})
            );
            return;
        }
        // Publish event for entity that they should show their Interaction Indicator
        this._eventService.publish(
            createShowInteractionIndicatorEvent({
                entityId: interactionItem.entity.entityId,
            })
        );
    }
}

interface IInteractionItem {
    entity: IObjectEntity;
    distanceToPlayer: number;
}
