import { Dictionary } from "../../../core/collection/Dictionary";
import { IDictionary } from "../../../core/collection/IDictionary";
import { isObjectDefined } from "../../../core/object/ObjectCheck";
import { ITrackedEntity } from "../api/ITrackedEntity";
import { IEntityTrackerQueryService } from "./IEntityTrackerServices";
import {
    IEntityTrackerDisposableService,
    IEntityTrackerService,
} from "./IEntityTrackerServices";

const ENTITY_MAP: IDictionary<number, ITrackedEntity> = new Dictionary();

export class EntityTrackerService
    implements
        IEntityTrackerService,
        IEntityTrackerDisposableService,
        IEntityTrackerQueryService {
    public queryByTag(tag: string): ITrackedEntity[] {
        return ENTITY_MAP.values().filter(
            entity =>
                entity.tags.filter(entityTag => entityTag === tag).length > 0
        );
    }
    public queryByNotTag(tag: string): ITrackedEntity[] {
        return ENTITY_MAP.values().filter(
            entity =>
                entity.tags.filter(entityTag => entityTag !== tag).length > 0
        );
    }
    public track(entity: ITrackedEntity): void {
        ENTITY_MAP.setValue(entity.id, entity);
    }
    public unTrack(entity: ITrackedEntity): void {
        ENTITY_MAP.remove(entity.id);
    }
    public disposeOfTracked(): void {
        ENTITY_MAP.forEach((_, entity) => entity.dispose());
        ENTITY_MAP.clear();
    }
    public disposeOfTrackedEntity(entityId: number): void {
        const entity = ENTITY_MAP.getValue(entityId);
        if (isObjectDefined(entity)) {
            entity.dispose();
            ENTITY_MAP.remove(entityId);
        }
    }
}
