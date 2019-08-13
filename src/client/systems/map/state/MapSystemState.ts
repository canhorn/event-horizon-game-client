import { IMapGraph } from "../api/IMapGraph";

const DEFAULT_MAP: IMapGraph = {
    numberOfNodes: 0,
    nodeList: [],
    edgeList: [],
};

const STATE: {
    mapGraph: IMapGraph;
} = {
    mapGraph: DEFAULT_MAP,
};

export const setSystemMapGraph = (mapGraph: IMapGraph) => {
    Object.assign(STATE, {
        mapGraph: { ...DEFAULT_MAP, ...mapGraph },
    });
};

export const getSystemMapGraph = (): IMapGraph => {
    return STATE.mapGraph;
};
