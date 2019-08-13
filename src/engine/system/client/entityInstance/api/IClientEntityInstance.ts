import { ServerVector3 } from "../../../../math/ServerVectors";

export interface IClientEntityInstance {
    id: string;
    name: string;
    position: ServerVector3;
    assetId: string;
    properties: any;
}
