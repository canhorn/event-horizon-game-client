import { IPlayerZoneDetails } from "../../../player/api/IPlayerZoneDetails";
import { IZoneInfo } from "./IZoneInfo";

export interface IZonePlayerInfo extends IZoneInfo {
    player: IPlayerZoneDetails;
}
