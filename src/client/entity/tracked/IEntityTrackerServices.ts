import { ITrackedEntity } from "../api/ITrackedEntity";

export abstract class IEntityTrackerService {
    public abstract track(entity: ITrackedEntity): void;
    public abstract unTrack(entity: ITrackedEntity): void;
}
export abstract class IEntityTrackerDisposableService {
    public abstract disposeOfTracked(): void;
    public abstract disposeOfTrackedEntity(entityId: number): void;
}
export abstract class IEntityTrackerQueryService {
    public abstract queryByTag(tag: string): ITrackedEntity[];
    public abstract queryByNotTag(tag: string): ITrackedEntity[];
}
