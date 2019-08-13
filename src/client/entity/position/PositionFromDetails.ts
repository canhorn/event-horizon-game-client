import { Vector3 } from "babylonjs";
import { ServerVector3Mapper } from "../../../engine/math/ServerVectors";
import { IObjectEntityDetails } from "../api/IObjectEntityDetails";

export const positionFromDetails = (details: IObjectEntityDetails) => {
    if (!details.position || !details.position.currentPosition) {
        return Vector3.Zero();
    } else {
        return ServerVector3Mapper.mapToVector3(
            details.position.currentPosition
        );
    }
};
