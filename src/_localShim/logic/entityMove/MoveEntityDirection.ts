import { Vector3 } from "babylonjs";
import { IObjectEntity } from "../../../client/entity/api/IObjectEntity";
import { MoveDirection } from "../../../client/systems/move/model/MoveDirection";
import { entityClientMove } from "../../clientActions/entityClientMove/EntityClientMove";

const MOVE_DISTANCE: number = 3;

export const moveEntityDirection = (
    entity: IObjectEntity,
    direction: MoveDirection
) => {
    switch (direction) {
        case MoveDirection.Forward:
            entityClientMove(
                entity.entityId,
                entity.position.add(new Vector3(0, 0, MOVE_DISTANCE))
            );
            break;
        case MoveDirection.Backwards:
            entityClientMove(
                entity.entityId,
                entity.position.add(new Vector3(0, 0, -MOVE_DISTANCE))
            );
            break;
        case MoveDirection.Left:
            entityClientMove(
                entity.entityId,
                entity.position.add(new Vector3(-MOVE_DISTANCE, 0, 0))
            );
            break;
        case MoveDirection.Right:
            entityClientMove(
                entity.entityId,
                entity.position.add(new Vector3(MOVE_DISTANCE, 0, 0))
            );
            break;
    }
};
