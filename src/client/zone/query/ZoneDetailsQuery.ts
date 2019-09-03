import { IQuery } from "../../../core/query";
import { IZoneDetails } from "../api/IZoneDetails";

/**
 * Type: ZoneDetailsQuery
 * NameSpace: Zone
 * Type: Query
 */
export const ZONE_DETAILS_QUERY = "Zone.ZONE_DETAILS_QUERY";
class QueryClass
    implements IQuery<ZoneDetailsQueryData, ZoneDetailsQueryResultType> {
    public type: string = ZONE_DETAILS_QUERY;
    public data?: ZoneDetailsQueryData;
}
const instanceOfQuery = new QueryClass();
export const createZoneDetailsQuery = (
    data: ZoneDetailsQueryData
): IQuery<ZoneDetailsQueryData, ZoneDetailsQueryResultType> => {
    instanceOfQuery.data = data;
    return instanceOfQuery;
};
export interface ZoneDetailsQueryData {}
export type ZoneDetailsQueryResultType = IZoneDetails;
