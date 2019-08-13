import { IHeightCoordinates } from "./IHeightCoordinates";
export abstract class ISetHeightResolver {
    public abstract setCoordinates(coordinates: IHeightCoordinates): void;
}
export abstract class IHeightResolver {
    public abstract findHeight(x: number, z: number): number;
}
