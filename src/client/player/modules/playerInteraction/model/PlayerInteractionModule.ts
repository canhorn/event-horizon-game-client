import { Dictionary } from "../../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../../core/collection/IDictionary";
import { IEventService } from "../../../../../core/event";
import { Inject } from "../../../../../core/ioc";
import { createLogger, ILogger } from "../../../../../core/logger";
import { isObjectNotDefined } from "../../../../../core/object/ObjectCheck";
import { LifeCycleModule } from "../../../../../engine/module/model/LifeCycleModule";
import { IObjectEntity } from "../../../../entity/api/IObjectEntity";
import { createClearInteractionIndicatorEvent } from "../../../../modules/interactionIndicator/clear/ClearInteractionIndicatorEvent";
import { createShowInteractionIndicatorEvent } from "../../../../modules/interactionIndicator/show/ShowInteractionIndicatorEvent";
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
        _eventService.on(
            ENTITY_WITHIN_INTERACTION_DISTANCE_EVENT,
            this.onEntityWithinDistance,
            this
        );

        _eventService.on(
            ENTITY_LEFT_INTERACTION_DISTANCE_EVENT,
            this.onEntityLeft,
            this
        );
    }
    public update(): void {}
    public dispose(): void {
        this._eventService.off(
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
