import { isObjectDefined } from "../../../core/object/ObjectCheck";
import {
    IQueryHandler,
    IQueryResult,
} from "../../../engine/query/IQueryService";
import { IZoneDetails } from "../api/IZoneDetails";
import { getZoneDetails } from "../state/ZoneState";
import { ZONE_DETAILS_QUERY } from "./ZoneDetailsQuery";
/**
 * Name: ZoneDetailsQueryHandler
 * Type: Query
 */
export class ZoneDetailsQueryHandler implements IQueryHandler {
    public type: string = ZONE_DETAILS_QUERY;
    constructor() {}
    public handle(): IQueryResult<IZoneDetails | undefined> {
        const zoneDetails: IZoneDetails | undefined = getZoneDetails();
        return {
            success: isObjectDefined(zoneDetails),
            result: zoneDetails,
            errorCode: "zone_details_not_found",
        };
    }
}
