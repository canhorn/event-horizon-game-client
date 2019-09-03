import { IEventService } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { createTrackEntityEvent } from "../../../../engine/entity/track/TrackEntityEvent";
import { createUnTrackEntityEvent } from "../../../../engine/entity/unTrack/UnTrackEntityEvent";
import { LifeCycleEntity } from "../../../../engine/lifecycle/model/LifeCycleEntity";
import { ITrackedEntity } from "../../api/ITrackedEntity";

export abstract class TrackedEntity extends LifeCycleEntity
    implements ITrackedEntity {
    protected _tags: string[] = [];
    get tags(): string[] {
        return this._tags;
    }
    constructor(
        protected readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
        _eventService.publish(createTrackEntityEvent({ entity: this }));
    }

    public dispose() {
        super.dispose();
        this._eventService.publish(createUnTrackEntityEvent({ entity: this }));
    }

    public abstract initialize(): void;
    public abstract onDispose(): void;
    public abstract update(): void;
    public abstract draw(): void;
}
