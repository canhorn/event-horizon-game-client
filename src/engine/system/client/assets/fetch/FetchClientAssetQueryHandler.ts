import { isObjectNotDefined } from "../../../../../core/object/ObjectCheck";
import { IQueryHandler, IQueryResult } from "../../../../query/IQueryService";
import { getClientAsset } from "../store/ClientAssetStore";
import {
    FETCH_CLIENT_ASSET_QUERY,
    FetchClientAssetQueryData,
    FetchClientAssetQueryResultType,
} from "./FetchClientAssetQuery";

/**
 * Name: FetchClientAssetQueryHandler
 * Type: Query
 */
export class FetchClientAssetQueryHandler implements IQueryHandler {
    public type: string = FETCH_CLIENT_ASSET_QUERY;
    constructor() {}
    public handle({
        assetId,
    }: FetchClientAssetQueryData): IQueryResult<
        FetchClientAssetQueryResultType<any>
    > {
        const result = getClientAsset(assetId);
        if (isObjectNotDefined(result)) {
            return {
                success: false,
                result: {} as any,
                errorCode: "not_found",
            };
        }
        return {
            success: true,
            result,
        };
    }
}
