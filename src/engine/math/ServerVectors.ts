import { Vector3 } from "babylonjs";

export interface ServerVector3 {
    x: number;
    y: number;
    z: number;
}

export class ServerVector3Mapper {
    public static mapToVector3(serverVector: ServerVector3) {
        return new Vector3(serverVector.x, serverVector.y, serverVector.z);
    }
}
