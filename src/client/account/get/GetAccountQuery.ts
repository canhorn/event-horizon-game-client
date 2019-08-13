import { IQuery } from "../../../engine/query/IQueryService";
import { IAccountState } from "../api/IAccountState";

/**
 * Type: GetAccountQuery
 * NameSpace: Account
 * Type: Query
 */
export const GET_ACCOUNT_QUERY = "Account.GET_ACCOUNT_QUERY";
export class QueryClass
    implements IQuery<GetAccountQueryData, GetAccountQueryResultType> {
    public type: string = GET_ACCOUNT_QUERY;
    public data?: GetAccountQueryData;
}
const instanceOfQuery = new QueryClass();
export const createGetAccountQuery = (
    data: GetAccountQueryData
): IQuery<GetAccountQueryData, GetAccountQueryResultType> => {
    instanceOfQuery.data = data;
    return instanceOfQuery;
};
export interface GetAccountQueryData {}
export type GetAccountQueryResultType = IAccountState;
