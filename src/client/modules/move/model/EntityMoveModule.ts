import {
    CLIENT_ACTION_ENTITY_MOVE_EVENT,
    ClientActionEntityMoveEventData,
} from "../../../action/api/ClientActions";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import { MoveModule } from "./MoveModule";

export class EntityMoveModule extends MoveModule {
    constructor(entity: IObjectEntity) {
        super(entity, 1);
        this._eventService.addEventListener(
            CLIENT_ACTION_ENTITY_MOVE_EVENT,
            this.onMove,
            this
        );
    }
    public dispose() {
        this._eventService.removeEventListener(
            CLIENT_ACTION_ENTITY_MOVE_EVENT,
            this.onMove,
            this
        );
    }

    /**
     * This adds a check of the entityId this move data might be used for.
     *
     * @param data
     * @override
     */
    public canMove({ entityId }: ClientActionEntityMoveEventData) {
        return this._entity.equals(entityId);
    }
}
