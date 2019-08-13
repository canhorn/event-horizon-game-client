import { IMapEdge } from "./IMapEdge";
import { IMapNode } from "./IMapNode";

export interface IMapGraph {
    numberOfNodes: number;
    nodeList: IMapNode[];
    edgeList: IMapEdge[];
}
