import { autobind } from "../../../../core/autobind/autobind";
import { IEventService } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { createLogger, ILogger } from "../../../../core/logger";
import { isObjectNotDefined } from "../../../../core/object/ObjectCheck";
import { IQueryService } from "../../../../core/query";
import { throttle } from "../../../../core/throttle/Throttle";
import { LifeCycleModule } from "../../../../engine/module/model/LifeCycleModule";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import { createEntityLeftInteractionDistanceEvent } from "../../../player/modules/playerInteraction/withIn/EntityLeftInteractionDistanceEvent";
import { createEntityWithinInteractionDistanceEvent } from "../../../player/modules/playerInteraction/withIn/EntityWithinInteractionDistanceEvent";
import { createGetClientPlayer } from "../../../player/query/getClientPlayer/GetClientPlayer";
import { IInteractionModule } from "../api/IInteractionModule";

export default class InteractionModule extends LifeCycleModule
    implements IInteractionModule {
    private _checkForPlayerInDistanceThrottled: () => void;
    constructor(
        private readonly _entity: IObjectEntity,
        private readonly _logger: ILogger = createLogger("InteractionModule"),
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _queryService: IQueryService = Inject(IQueryService)
    ) {
        super();

        this._checkForPlayerInDistanceThrottled = throttle(
            this.checkForPlayerInDistance,
            100
        );
    }
    public update(): void {
        this._checkForPlayerInDistanceThrottled();
    }
    public dispose(): void {}

    @autobind
    private checkForPlayerInDistance() {
        const player = this._queryService.query(createGetClientPlayer({}))
            .result;
        if (
            isObjectNotDefined(player) ||
            this._entity.entityId === player.entityId
        ) {
            return;
        }

        const playerPosition = player.position;
        const currentPos = this._entity.position;
        const toPlayer = playerPosition.subtract(currentPos);
        const distanceToPlayer = toPlayer.length();

        // TODO: Move to Entity Property state.
        if (distanceToPlayer <= 10) {
            this._eventService.publish(
                createEntityWithinInteractionDistanceEvent({
                    entity: this._entity,
                    distanceToPlayer,
                })
            );
            return;
        }
        this._eventService.publish(
            createEntityLeftInteractionDistanceEvent({
                entity: this._entity,
            })
        );
    }
}
