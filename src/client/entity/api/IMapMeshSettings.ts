export interface IMapMeshSettings {
    name?: string;
    lightTag: string;
    heightMapUrl: string;
    isPickable?: boolean;
    width?: number;
    height?: number;
    subdivisions?: number;
    minHeight?: number;
    maxHeight?: number;
    updatable?: boolean;
}
