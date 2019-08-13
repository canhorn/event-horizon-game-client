import { ServerVector3 } from "../../../../engine/math/ServerVectors";

export interface IMapNode {
    index: number;
    position: ServerVector3;
    info: any;
}
