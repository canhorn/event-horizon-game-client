import { IQuery } from "../../../../core/query";

/**
 * Type: QueryForEntity
 * NameSpace: Entity.Tracked
 * Type: Query
 */
export const QUERY_FOR_ENTITY = "Entity.Tracked.QUERY_FOR_ENTITY";
class QueryClass
    implements IQuery<QueryForEntityData, QueryForEntityResultType<any>> {
    public type: string = QUERY_FOR_ENTITY;
    public data?: QueryForEntityData;
}
const instanceOfQuery = new QueryClass();
export const createQueryForEntity = <T>(
    data: QueryForEntityData
): IQuery<QueryForEntityData, QueryForEntityResultType<T>> => {
    instanceOfQuery.data = data;
    return instanceOfQuery;
};
export interface QueryForEntityData {
    not?: boolean;
    tag: string;
}
export type QueryForEntityResultType<T> = T[];
