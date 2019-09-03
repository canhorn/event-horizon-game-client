import { IQuery } from "../../../../../core/query";
import { IClientAsset } from "../api/IClientAsset";

/**
 * Type: FetchClientAssetQuery
 * NameSpace: System.Client.Assets
 * Type: Query
 */
export const FETCH_CLIENT_ASSET_QUERY =
    "System.Client.Assets.FETCH_CLIENT_ASSET_QUERY";
class QueryClass
    implements
        IQuery<
            FetchClientAssetQueryData,
            FetchClientAssetQueryResultType<any>
        > {
    public type: string = FETCH_CLIENT_ASSET_QUERY;
    public data?: FetchClientAssetQueryData;
}
const instanceOfQuery = new QueryClass();
export const createFetchClientAssetQuery = <T = {}>(
    data: FetchClientAssetQueryData
): IQuery<FetchClientAssetQueryData, FetchClientAssetQueryResultType<T>> => {
    instanceOfQuery.data = data;
    return instanceOfQuery;
};
export interface FetchClientAssetQueryData {
    assetId: string;
}
export type FetchClientAssetQueryResultType<T> = IClientAsset<T>;
