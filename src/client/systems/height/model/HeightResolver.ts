import { IHeightCoordinates } from "../api/IHeightCoordinates";
import { IHeightResolver, ISetHeightResolver } from "../api/IHeightResolver";

let COORDINATES: IHeightCoordinates = {
    getHeightAtCoordinates: () => 0,
};
export class HeightResolver implements IHeightResolver, ISetHeightResolver {
    public setCoordinates(coordinates: IHeightCoordinates) {
        COORDINATES = coordinates;
    }
    public findHeight(x: number, z: number): number {
        return COORDINATES.getHeightAtCoordinates(x, z) || 0;
    }
}
